import React, { useMemo, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { products } from '../data/products';
import { useI18n } from '../i18n/I18nProvider';
import { pickText } from '../i18n/text';
import './ChatAssistant.css';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  products?: Product[];
}

interface ChatAssistantProps {
  onAddToCart?: (product: Product) => void;
}

export const ChatAssistant: React.FC<ChatAssistantProps> = ({ onAddToCart }) => {
  const navigate = useNavigate();
  const { t, lang } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: t('chat.greeting'),
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const productCatalog = useMemo(() => {
    // Keep payload small but useful for recommendations
    return products.slice(0, 80).map((p) => ({
      id: p.id,
      name: pickText(p.name, lang),
      description: pickText(p.description, lang),
      price: p.price,
      categoryKey: p.categoryKey,
      subcategoryKey: p.subcategoryKey ?? '',
      brand: p.brand ?? ''
    }));
  }, [lang]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    setIsLoading(true);
    try {
      const payload = {
        lang,
        productCatalog,
        messages: [...messages, userMessage].slice(-12).map((m) => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text
        }))
      };

      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!resp.ok) throw new Error(await resp.text());
      const data: { text: string; productIds?: number[] } = await resp.json();

      const ids = Array.isArray(data.productIds) ? data.productIds : [];
      const picked = ids
        .map((id) => products.find((p) => p.id === id))
        .filter((p): p is Product => Boolean(p))
        .slice(0, 3);

      const assistantMessage: Message = {
        id: Date.now() + 1,
        text: data.text || (lang === 'en' ? 'OK.' : 'Добре.'),
        sender: 'assistant',
        timestamp: new Date(),
        products: picked.length > 0 ? picked : undefined
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch {
      // Fallback to local heuristic
      const response = generateAIResponse(userMessage.text);
      const assistantMessage: Message = {
        id: Date.now() + 1,
        text: response.text,
        sender: 'assistant',
        timestamp: new Date(),
        products: response.products
      };
      setMessages(prev => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price: number): string => {
    const locale = lang === 'en' ? 'en-US' : 'uk-UA';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'UAH'
    }).format(price);
  };

  const findProducts = (userInput: string): { text: string; products: Product[] } => {
    const input = userInput.toLowerCase();
    let foundProducts: Product[] = [];
    let responseText = '';

    // Пошук за категорією
    const categoryKeywords: Record<string, string[]> = {
      laptops: ['ноутбук', "комп'ютер", 'laptop', 'notebook'],
      phones: ['смартфон', 'телефон', 'iphone', 'android', 'phone'],
      watches: ['годинник', 'watch', 'smartwatch'],
      audio: ['навушники', 'колонки', 'аудіо', 'headphones', 'speaker', 'audio'],
      tablets: ['планшет', 'tablet', 'ipad'],
      photo: ['камера', 'фото', 'camera', 'photo', 'lens']
    };

    for (const [categoryKey, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some((keyword) => input.includes(keyword))) {
        foundProducts = products.filter((p) => p.categoryKey === categoryKey);
        responseText =
          lang === 'en'
            ? `Here are products from this category:`
            : 'Ось товари з цієї категорії:';
        break;
      }
    }

    // Пошук за ціною
    const priceMatch = input.match(/(\d+)\s*(тис|к|грн|₴)/);
    if (priceMatch && foundProducts.length === 0) {
      const maxPrice = parseInt(priceMatch[1]) * 1000;
      foundProducts = products.filter(p => p.price <= maxPrice);
      if (foundProducts.length > 0) {
        responseText = lang === 'en' ? `Here are products up to ${formatPrice(maxPrice)}:` : `Ось товари до ${formatPrice(maxPrice)}:`;
      }
    }

    // Пошук за характеристиками
    if (foundProducts.length === 0) {
      const keywords = ['потужний', 'швидкий', 'якісний', 'найкращий', 'популярний'];
      if (keywords.some(kw => input.includes(kw))) {
        foundProducts = products.sort((a, b) => b.price - a.price).slice(0, 3);
        responseText = lang === 'en' ? 'Here are the most popular items:' : 'Ось найпопулярніші товари:';
      }
    }

    // Пошук за назвою
    if (foundProducts.length === 0) {
      foundProducts = products.filter((p) => {
        const name = pickText(p.name, lang).toLowerCase();
        const desc = pickText(p.description, lang).toLowerCase();
        return name.includes(input) || desc.includes(input);
      }
      );
      if (foundProducts.length > 0) {
        responseText = lang === 'en' ? 'Items found for your query:' : 'Знайдені товари за вашим запитом:';
      }
    }

    // Якщо нічого не знайдено, пропонуємо всі товари
    if (foundProducts.length === 0) {
      foundProducts = products;
      responseText = lang === 'en' ? 'Here are all our products. What are you looking for?' : 'Ось всі наші товари. Що саме вас цікавить?';
    }

    return { text: responseText, products: foundProducts.slice(0, 3) };
  };

  const generateAIResponse = (userInput: string): { text: string; products?: Product[] } => {
    const input = userInput.toLowerCase();
    
    if (input.includes('привіт') || input.includes('вітаю') || input.includes('добр')) {
      return {
        text:
          lang === 'en'
            ? 'Hi! I can help you find the perfect product. What are you interested in? I can suggest items by category, price, or features.'
            : 'Привіт! Рада вас бачити. Я допоможу знайти ідеальний товар для вас. Що вас цікавить? Можу показати товари за категорією, ціною або характеристиками.'
      };
    }
    
    if (input.includes('доставка') || input.includes('достав')) {
      return {
        text:
          lang === 'en'
            ? 'We deliver across Ukraine. Delivery time depends on your location. Free delivery for orders over 5000 UAH. See details in “Delivery”.'
            : 'Ми доставляємо товари по всій Україні. Терміни доставки залежать від вашого місцезнаходження. Безкоштовна доставка при замовленні від 5000 грн. Детальніше в розділі "Доставка".'
      };
    }
    
    if (input.includes('кошик') || input.includes('замовлення')) {
      return {
        text:
          lang === 'en'
            ? 'To add an item to the cart, click “Add to cart” on a product card or inside chat. The cart is in the top-right corner.'
            : 'Щоб додати товар до кошика, натисніть кнопку "Додати до кошика" на картці товару або в чаті. Кошик знаходиться в правому верхньому куті.'
      };
    }
    
    if (input.includes('допомога') || input.includes('допомог') || input.includes('що')) {
      return {
        text:
          lang === 'en'
            ? 'I can:\n• Recommend products by category\n• Find items within your price range\n• Suggest popular picks\n• Answer questions about delivery and payment\n\nWhat are you looking for?'
            : 'Я можу:\n• Підібрати товари за категорією (ноутбуки, смартфони, навушники тощо)\n• Знайти товари у вашому діапазоні цін\n• Порекомендувати найпопулярніші товари\n• Відповісти на питання про доставку та оплату\n\nЩо вас цікавить?'
      };
    }

    // Пошук товарів
    const result = findProducts(userInput);
    return result;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <button 
        className={`chat-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title={t('chat.title')}
      >
        {isOpen ? '✕' : '💬'}
      </button>
      
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-header-info">
              <span className="chat-avatar">🤖</span>
              <div>
                <h3>{t('chat.title')}</h3>
                <span className="chat-status">{t('chat.online')}</span>
              </div>
            </div>
            <button className="chat-close" onClick={() => setIsOpen(false)}>✕</button>
          </div>
          
          <div className="chat-messages">
            {messages.map((message) => (
              <div key={message.id}>
                <div className={`message ${message.sender}`}>
                  <div className="message-content">
                    {message.text.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i < message.text.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </div>
                  <span className="message-time">
                    {message.timestamp.toLocaleTimeString(lang === 'en' ? 'en-US' : 'uk-UA', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
                {message.products && message.products.length > 0 && (
                  <div className="chat-products">
                    {message.products.map((product) => (
                      <div 
                        key={product.id} 
                        className="chat-product-card"
                        onClick={() => {
                          navigate(`/product/${product.id}`);
                          setIsOpen(false);
                        }}
                      >
                        <img src={product.image} alt={pickText(product.name, lang)} />
                        <div className="chat-product-info">
                          <h4>{pickText(product.name, lang)}</h4>
                          <p className="chat-product-price">{formatPrice(product.price)}</p>
                          <button 
                            className="chat-product-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onAddToCart) {
                                onAddToCart(product);
                                const confirmMessage: Message = {
                                  id: Date.now(),
                                  text:
                                    lang === 'en'
                                      ? `✅ "${pickText(product.name, lang)}" added to cart!`
                                      : `✅ "${pickText(product.name, lang)}" додано до кошика!`,
                                  sender: 'assistant',
                                  timestamp: new Date()
                                };
                                setMessages(prev => [...prev, confirmMessage]);
                              }
                            }}
                          >
                            {t('chat.addToCart')}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="message assistant">
                <div className="message-content">{lang === 'en' ? 'Typing…' : 'Друкую…'}</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chat-input-container">
            <input
              type="text"
              className="chat-input"
              placeholder={t('chat.placeholder')}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <button className="chat-send" onClick={handleSend} disabled={isLoading}>
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};
