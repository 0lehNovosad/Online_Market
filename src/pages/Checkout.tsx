import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../types';
import { UserProfile } from '../types';
import { useI18n } from '../i18n/I18nProvider';
import { pickText } from '../i18n/text';
import './Checkout.css';

interface CheckoutProps {
  cartItems: CartItem[];
  onOrderComplete: () => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ cartItems, onOrderComplete }) => {
  const navigate = useNavigate();
  const { t, lang } = useI18n();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'card',
    deliveryMethod: 'courier'
  });

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Завантажуємо профіль з localStorage
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setUserProfile(profile);
      setFormData(prev => ({
        ...prev,
        name: profile.name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        address: profile.address || ''
      }));
    }
  }, []);

  const formatPrice = (price: number): string => {
    const locale = lang === 'en' ? 'en-US' : 'uk-UA';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'UAH'
    }).format(price);
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Валідація
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      alert(lang === 'en' ? 'Please fill in all required fields' : "Будь ласка, заповніть всі обов'язкові поля");
      return;
    }

    // Створюємо замовлення
    const order = {
      id: Date.now(),
      items: cartItems,
      customer: formData,
      total: total,
      date: new Date().toISOString(),
      status: 'pending'
    };

    // Зберігаємо замовлення в localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Очищаємо кошик
    onOrderComplete();

    // Показуємо підтвердження
    alert(
      lang === 'en'
        ? `Order #${order.id} has been placed successfully! Thank you for your purchase!`
        : `Замовлення №${order.id} успішно оформлено! Дякуємо за покупку!`
    );
    
    // Переходимо на головну
    navigate('/');
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <div className="empty-checkout">
            <h2>{t('checkout.emptyTitle')}</h2>
            <p>{t('checkout.emptyText')}</p>
            <button onClick={() => navigate('/')} className="back-to-shop-btn">
              {t('checkout.backToShop')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← {t('checkout.back')}
        </button>
        
        <h1 className="checkout-title">{t('checkout.title')}</h1>
        
        <div className="checkout-content">
          <div className="checkout-form-section">
            <form className="checkout-form" onSubmit={handleSubmit}>
              <div className="form-section">
                <h2>{t('checkout.contactTitle')}</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">{t('checkout.name')} *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">{t('checkout.email')} *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="phone">{t('checkout.phone')} *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+380 XX XXX XX XX"
                    required
                  />
                </div>
              </div>

              <div className="form-section">
                <h2>{t('checkout.addressTitle')}</h2>
                <div className="form-group">
                  <label htmlFor="city">{t('checkout.city')} *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">{t('checkout.address')} *</label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="postalCode">{t('checkout.postalCode')}</label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-section">
                <h2>{t('checkout.deliveryTitle')}</h2>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="courier"
                      checked={formData.deliveryMethod === 'courier'}
                      onChange={handleInputChange}
                    />
                    <span>{t('checkout.delivery.courier')}</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="pickup"
                      checked={formData.deliveryMethod === 'pickup'}
                      onChange={handleInputChange}
                    />
                    <span>{t('checkout.delivery.pickup')}</span>
                  </label>
                </div>
              </div>

              <div className="form-section">
                <h2>{t('checkout.paymentTitle')}</h2>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                    />
                    <span>{t('checkout.payment.card')}</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === 'cash'}
                      onChange={handleInputChange}
                    />
                    <span>{t('checkout.payment.cash')}</span>
                  </label>
                </div>
              </div>

              <button type="submit" className="submit-order-btn">
                {t('checkout.confirm')}
              </button>
            </form>
          </div>

          <div className="checkout-summary">
            <h2>{t('checkout.orderTitle')}</h2>
            <div className="order-items">
              {cartItems.map((item) => (
                <div key={item.id} className="order-item">
                  <img src={item.image} alt={pickText(item.name, lang)} />
                  <div className="order-item-info">
                    <h4>{pickText(item.name, lang)}</h4>
                    <p>{item.quantity} × {formatPrice(item.price)}</p>
                  </div>
                  <span className="order-item-total">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="order-summary">
              <div className="summary-row">
                <span>{t('checkout.itemsCount')}</span>
                <span>
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)} {t('checkout.itemsSuffix')}
                </span>
              </div>
              <div className="summary-row">
                <span>{t('checkout.shipping')}</span>
                <span>
                  {formData.deliveryMethod === 'pickup' ? t('checkout.shipping.free') : t('checkout.shipping.carrier')}
                </span>
              </div>
              <div className="summary-row total">
                <span>{t('checkout.toPay')}</span>
                <span className="final-total">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
