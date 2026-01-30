import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: { uk: 'Ноутбук Dell XPS 15', en: 'Dell XPS 15 Laptop' },
    price: 45999,
    description: {
      uk: 'Потужний ноутбук з екраном 15.6", Intel Core i7, 16GB RAM, 512GB SSD',
      en: 'Powerful 15.6" laptop with Intel Core i7, 16GB RAM, 512GB SSD'
    },
    fullDescription: {
      uk: 'Dell XPS 15 — це преміум ноутбук для професіоналів та творчих людей. Оснащений яскравим дисплеєм InfinityEdge з мінімальними рамками, потужним процесором Intel Core i7 та швидким SSD накопичувачем. Ідеальний для дизайну, відеомонтажу та роботи з великими файлами. Легкий алюмінієвий корпус забезпечує мобільність, а довготривала батарея дозволяє працювати весь день без підзарядки.',
      en: 'Dell XPS 15 is a premium laptop for professionals and creatives. Features a bright InfinityEdge display with minimal bezels, powerful Intel Core i7 processor, and fast SSD storage. Perfect for design, video editing, and working with large files. Lightweight aluminum body ensures mobility, while long-lasting battery allows all-day work without charging.'
    },
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=800&fit=crop',
    categoryKey: 'laptops',
    subcategoryKey: 'laptops-all',
    brand: 'Dell',
    specs: [
      { label: { uk: 'Діагональ екрану', en: 'Screen size' }, value: { uk: '15.6"', en: '15.6"' } },
      { label: { uk: 'Процесор', en: 'Processor' }, value: { uk: 'Intel Core i7', en: 'Intel Core i7' } },
      { label: { uk: 'Оперативна пам\'ять', en: 'RAM' }, value: { uk: '16GB', en: '16GB' } },
      { label: { uk: 'Накопичувач', en: 'Storage' }, value: { uk: '512GB SSD', en: '512GB SSD' } },
      { label: { uk: 'Відеокарта', en: 'Graphics' }, value: { uk: 'NVIDIA GeForce RTX', en: 'NVIDIA GeForce RTX' } },
      { label: { uk: 'Операційна система', en: 'OS' }, value: { uk: 'Windows 11', en: 'Windows 11' } }
    ]
  },
  {
    id: 2,
    name: { uk: 'iPhone 15 Pro', en: 'iPhone 15 Pro' },
    price: 49999,
    description: {
      uk: 'Смартфон Apple з камерою 48MP, процесором A17 Pro, 256GB',
      en: 'Apple smartphone with 48MP camera, A17 Pro chip, 256GB'
    },
    fullDescription: {
      uk: 'iPhone 15 Pro — найпотужніший смартфон Apple з титановим корпусом та революційним чипом A17 Pro. Трикамерна система Pro з 48MP основною камерою забезпечує професійну якість фото та відео. Дисплей Super Retina XDR з технологією ProMotion до 120Hz для плавної роботи. Підтримка USB-C, бездротова зарядка MagSafe та водозахист IP68.',
      en: 'iPhone 15 Pro is Apple\'s most powerful smartphone with titanium body and revolutionary A17 Pro chip. Triple Pro camera system with 48MP main camera delivers professional photo and video quality. Super Retina XDR display with ProMotion up to 120Hz for smooth operation. USB-C support, MagSafe wireless charging, and IP68 water resistance.'
    },
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&h=800&fit=crop',
    categoryKey: 'phones',
    subcategoryKey: 'phones-all',
    brand: 'Apple',
    specs: [
      { label: { uk: 'Діагональ екрану', en: 'Screen size' }, value: { uk: '6.1"', en: '6.1"' } },
      { label: { uk: 'Процесор', en: 'Processor' }, value: { uk: 'Apple A17 Pro', en: 'Apple A17 Pro' } },
      { label: { uk: 'Оперативна пам\'ять', en: 'RAM' }, value: { uk: '8GB', en: '8GB' } },
      { label: { uk: 'Внутрішня пам\'ять', en: 'Storage' }, value: { uk: '256GB', en: '256GB' } },
      { label: { uk: 'Основна камера', en: 'Main camera' }, value: { uk: '48MP + 12MP + 12MP', en: '48MP + 12MP + 12MP' } },
      { label: { uk: 'Фронтальна камера', en: 'Front camera' }, value: { uk: '12MP', en: '12MP' } },
      { label: { uk: 'Батарея', en: 'Battery' }, value: { uk: '3274 mAh', en: '3274 mAh' } },
      { label: { uk: 'Операційна система', en: 'OS' }, value: { uk: 'iOS 17', en: 'iOS 17' } }
    ]
  },
  {
    id: 3,
    name: { uk: 'Samsung Galaxy Watch 6', en: 'Samsung Galaxy Watch 6' },
    price: 12999,
    description: {
      uk: "Розумний годинник з моніторингом здоров'я, GPS, водонепроникністю",
      en: 'Smartwatch with health tracking, GPS, and water resistance'
    },
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop',
    categoryKey: 'watches',
    subcategoryKey: 'smartwatches',
    brand: 'Samsung'
  },
  {
    id: 4,
    name: { uk: 'Навушники Sony WH-1000XM5', en: 'Sony WH-1000XM5 Headphones' },
    price: 15999,
    description: {
      uk: 'Бездротові навушники з шумозаглушенням, батарея до 30 годин',
      en: 'Wireless noise-cancelling headphones with up to 30 hours battery life'
    },
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
    categoryKey: 'audio',
    subcategoryKey: 'headphones',
    brand: 'Sony'
  },
  {
    id: 5,
    name: { uk: 'Планшет iPad Air', en: 'iPad Air Tablet' },
    price: 29999,
    description: {
      uk: 'Планшет Apple з екраном 10.9", чип M1, 256GB, підтримка Apple Pencil',
      en: 'Apple tablet with 10.9" display, M1 chip, 256GB, Apple Pencil support'
    },
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=800&fit=crop',
    categoryKey: 'tablets',
    subcategoryKey: 'tablets-all',
    brand: 'Apple'
  },
  {
    id: 6,
    name: { uk: 'Камера Canon EOS R6', en: 'Canon EOS R6 Camera' },
    price: 89999,
    description: {
      uk: 'Дзеркальна камера 20MP, відео 4K, стабілізація зображення',
      en: '20MP camera with 4K video and image stabilization'
    },
    image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&h=800&fit=crop',
    categoryKey: 'photo',
    subcategoryKey: 'cameras',
    brand: 'Canon'
  },
  {
    id: 7,
    name: { uk: 'Ноутбук Apple MacBook Air M2', en: 'Apple MacBook Air M2 Laptop' },
    price: 56999,
    description: {
      uk: '13.6", чип Apple M2, 8GB RAM, 256GB SSD — легкий і автономний',
      en: '13.6", Apple M2 chip, 8GB RAM, 256GB SSD — lightweight and long battery life'
    },
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=800&fit=crop',
    categoryKey: 'laptops',
    subcategoryKey: 'laptops-all',
    brand: 'Apple'
  },
  {
    id: 8,
    name: { uk: 'Ноутбук ASUS ROG Strix G15', en: 'ASUS ROG Strix G15 Gaming Laptop' },
    price: 62999,
    description: {
      uk: 'Ігровий ноутбук: 15.6", Ryzen 7, 16GB RAM, 1TB SSD, RTX графіка',
      en: 'Gaming laptop: 15.6", Ryzen 7, 16GB RAM, 1TB SSD, RTX graphics'
    },
    image: 'https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?w=800&h=800&fit=crop',
    categoryKey: 'laptops',
    subcategoryKey: 'laptops-all',
    brand: 'ASUS'
  },
  {
    id: 9,
    name: { uk: 'Ноутбук Lenovo IdeaPad 5', en: 'Lenovo IdeaPad 5 Laptop' },
    price: 32999,
    description: {
      uk: '14", Ryzen 5, 16GB RAM, 512GB SSD — оптимальний для навчання і роботи',
      en: '14", Ryzen 5, 16GB RAM, 512GB SSD — great for study and work'
    },
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&h=800&fit=crop',
    categoryKey: 'laptops',
    subcategoryKey: 'laptops-all',
    brand: 'Lenovo'
  },
  {
    id: 10,
    name: { uk: 'Смартфон Samsung Galaxy S24', en: 'Samsung Galaxy S24 Smartphone' },
    price: 42999,
    description: {
      uk: 'Флагман Samsung: AMOLED, топ-камера, швидка зарядка, 256GB',
      en: 'Samsung flagship: AMOLED, top camera, fast charging, 256GB'
    },
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop',
    categoryKey: 'phones',
    subcategoryKey: 'phones-all',
    brand: 'Samsung'
  },
  {
    id: 11,
    name: { uk: 'Смартфон Xiaomi 14', en: 'Xiaomi 14 Smartphone' },
    price: 28999,
    description: {
      uk: 'Потужний смартфон з AMOLED, швидкою зарядкою та 256GB памʼяті',
      en: 'Powerful smartphone with AMOLED, fast charging and 256GB storage'
    },
    image: 'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?w=800&h=800&fit=crop',
    categoryKey: 'phones',
    subcategoryKey: 'phones-all',
    brand: 'Xiaomi'
  },
  {
    id: 12,
    name: { uk: 'Навушники Apple AirPods Pro 2', en: 'Apple AirPods Pro (2nd gen)' },
    price: 10999,
    description: {
      uk: 'Активне шумозаглушення, просторовий звук, зарядний кейс USB‑C',
      en: 'Active noise cancellation, spatial audio, USB‑C charging case'
    },
    image: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=800&h=800&fit=crop',
    categoryKey: 'audio',
    subcategoryKey: 'headphones',
    brand: 'Apple'
  },
  {
    id: 13,
    name: { uk: 'Портативна колонка JBL Flip 6', en: 'JBL Flip 6 Portable Speaker' },
    price: 4999,
    description: {
      uk: 'Потужний звук, захист IP67, до 12 годин роботи',
      en: 'Big sound, IP67 protection, up to 12 hours playtime'
    },
    image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=800&h=800&fit=crop',
    categoryKey: 'audio',
    subcategoryKey: 'speakers',
    brand: 'JBL'
  },
  {
    id: 14,
    name: { uk: 'Планшет Samsung Galaxy Tab S9', en: 'Samsung Galaxy Tab S9 Tablet' },
    price: 34999,
    description: {
      uk: '11", AMOLED, S Pen, 256GB — для роботи та розваг',
      en: '11", AMOLED, S Pen, 256GB — for work and entertainment'
    },
    image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&h=800&fit=crop',
    categoryKey: 'tablets',
    subcategoryKey: 'tablets-all',
    brand: 'Samsung'
  },
  {
    id: 15,
    name: { uk: 'Фотоапарат Sony Alpha a7 IV', en: 'Sony Alpha a7 IV Camera' },
    price: 99999,
    description: {
      uk: 'Full‑frame бездзеркальний, 33MP, 4K 60fps, стабілізація',
      en: 'Full‑frame mirrorless, 33MP, 4K 60fps, stabilization'
    },
    image: 'https://images.unsplash.com/photo-1519183071298-a2962be96c09?w=800&h=800&fit=crop',
    categoryKey: 'photo',
    subcategoryKey: 'cameras',
    brand: 'Sony'
  },
  {
    id: 16,
    name: { uk: "Обʼєктив Canon RF 50mm f/1.8", en: 'Canon RF 50mm f/1.8 Lens' },
    price: 8999,
    description: {
      uk: "Світлосильний обʼєктив для портретів і універсальної зйомки",
      en: 'Fast prime lens for portraits and everyday shooting'
    },
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&h=800&fit=crop',
    categoryKey: 'photo',
    subcategoryKey: 'lenses',
    brand: 'Canon'
  },
  {
    id: 17,
    name: { uk: 'Apple Watch Series 9', en: 'Apple Watch Series 9' },
    price: 16999,
    description: {
      uk: "Розумний годинник з відстеженням здоровʼя, GPS, Always‑On дисплей",
      en: 'Smartwatch with health tracking, GPS, always-on display'
    },
    image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=800&h=800&fit=crop',
    categoryKey: 'watches',
    subcategoryKey: 'smartwatches',
    brand: 'Apple'
  },
  {
    id: 18,
    name: { uk: 'Класичний годинник Casio Edifice', en: 'Casio Edifice Classic Watch' },
    price: 5999,
    description: {
      uk: 'Стильний класичний годинник, нержавіюча сталь, водозахист',
      en: 'Stylish classic watch, stainless steel, water resistance'
    },
    image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800&h=800&fit=crop',
    categoryKey: 'watches',
    subcategoryKey: 'classic',
    brand: 'Casio'
  },
  // Системні блоки (ПК)
  {
    id: 19,
    name: { uk: 'Системний блок ASUS ROG Strix G15', en: 'ASUS ROG Strix G15 Desktop PC' },
    price: 54999,
    description: {
      uk: 'Ігровий ПК: AMD Ryzen 7, 32GB RAM, 1TB SSD, RTX 4070',
      en: 'Gaming PC: AMD Ryzen 7, 32GB RAM, 1TB SSD, RTX 4070'
    },
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&h=800&fit=crop',
    categoryKey: 'laptops',
    subcategoryKey: 'desktops',
    brand: 'ASUS'
  },
  {
    id: 20,
    name: { uk: 'Системний блок Dell OptiPlex 7090', en: 'Dell OptiPlex 7090 Desktop PC' },
    price: 38999,
    description: {
      uk: 'Офісний ПК: Intel Core i7, 16GB RAM, 512GB SSD',
      en: 'Office PC: Intel Core i7, 16GB RAM, 512GB SSD'
    },
    image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800&h=800&fit=crop',
    categoryKey: 'laptops',
    subcategoryKey: 'desktops',
    brand: 'Dell'
  },
  // Монітори
  {
    id: 21,
    name: { uk: 'Монітор Dell UltraSharp U2720Q', en: 'Dell UltraSharp U2720Q Monitor' },
    price: 18999,
    description: {
      uk: '27" 4K UHD монітор, IPS, USB-C, для дизайну та роботи',
      en: '27" 4K UHD monitor, IPS, USB-C, for design and work'
    },
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=800&fit=crop',
    categoryKey: 'laptops',
    subcategoryKey: 'monitors',
    brand: 'Dell'
  },
  {
    id: 22,
    name: { uk: 'Монітор ASUS ROG Swift PG279Q', en: 'ASUS ROG Swift PG279Q Monitor' },
    price: 22999,
    description: {
      uk: '27" 1440p ігровий монітор, 165Hz, G-Sync, IPS',
      en: '27" 1440p gaming monitor, 165Hz, G-Sync, IPS'
    },
    image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&h=800&fit=crop',
    categoryKey: 'laptops',
    subcategoryKey: 'monitors',
    brand: 'ASUS'
  },
  // Аксесуари для смартфонів
  {
    id: 23,
    name: { uk: 'Чохол для iPhone 15 Pro', en: 'iPhone 15 Pro Case' },
    price: 899,
    description: {
      uk: 'Захисний чохол з підтримкою MagSafe, прозорий',
      en: 'Protective case with MagSafe support, transparent'
    },
    image: 'https://images.unsplash.com/photo-1601972602237-8c79241e468b?w=800&h=800&fit=crop',
    categoryKey: 'phones',
    subcategoryKey: 'phone-accessories',
    brand: 'Apple'
  },
  {
    id: 24,
    name: { uk: 'Захисне скло для Samsung Galaxy S24', en: 'Samsung Galaxy S24 Screen Protector' },
    price: 599,
    description: {
      uk: 'Захисне скло 9H, повне покриття, легке нанесення',
      en: '9H screen protector, full coverage, easy installation'
    },
    image: 'https://images.unsplash.com/photo-1601972602237-8c79241e468b?w=800&h=800&fit=crop',
    categoryKey: 'phones',
    subcategoryKey: 'phone-accessories',
    brand: 'Samsung'
  },
  {
    id: 25,
    name: { uk: 'Бездротова зарядка Xiaomi', en: 'Xiaomi Wireless Charger' },
    price: 1299,
    description: {
      uk: 'Швидка бездротова зарядка 20W, підтримка всіх стандартів',
      en: 'Fast 20W wireless charger, supports all standards'
    },
    image: 'https://images.unsplash.com/photo-1601972602237-8c79241e468b?w=800&h=800&fit=crop',
    categoryKey: 'phones',
    subcategoryKey: 'phone-accessories',
    brand: 'Xiaomi'
  },
  // Бездротові навушники
  {
    id: 26,
    name: { uk: 'Навушники Samsung Galaxy Buds2 Pro', en: 'Samsung Galaxy Buds2 Pro Earbuds' },
    price: 6999,
    description: {
      uk: 'Бездротові TWS навушники, активне шумозаглушення, 360 Audio',
      en: 'Wireless TWS earbuds, active noise cancellation, 360 Audio'
    },
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
    categoryKey: 'audio',
    subcategoryKey: 'headphones',
    brand: 'Samsung'
  },
  {
    id: 27,
    name: { uk: 'Навушники Sony WF-1000XM5', en: 'Sony WF-1000XM5 Earbuds' },
    price: 8999,
    description: {
      uk: 'Бездротові TWS з найкращим шумозаглушенням, 8 годин роботи',
      en: 'Wireless TWS with best noise cancellation, 8 hours battery'
    },
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
    categoryKey: 'audio',
    subcategoryKey: 'headphones',
    brand: 'Sony'
  },
  // Додаткові колонки
  {
    id: 28,
    name: { uk: 'Колонка Sony SRS-XB43', en: 'Sony SRS-XB43 Speaker' },
    price: 8999,
    description: {
      uk: 'Портативна колонка з басами X-Balanced, IP67, 24 години роботи',
      en: 'Portable speaker with X-Balanced bass, IP67, 24 hours battery'
    },
    image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=800&h=800&fit=crop',
    categoryKey: 'audio',
    subcategoryKey: 'speakers',
    brand: 'Sony'
  },
  // Додаткові планшети
  {
    id: 29,
    name: { uk: 'Планшет Apple iPad Pro 12.9"', en: 'Apple iPad Pro 12.9"' },
    price: 59999,
    description: {
      uk: '12.9" планшет з чипом M2, 256GB, підтримка Apple Pencil та Magic Keyboard',
      en: '12.9" tablet with M2 chip, 256GB, Apple Pencil and Magic Keyboard support'
    },
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=800&fit=crop',
    categoryKey: 'tablets',
    subcategoryKey: 'tablets-all',
    brand: 'Apple'
  },
  // Додаткові об\'єктиви
  {
    id: 30,
    name: { uk: "Об'єктив Sony FE 24-70mm f/2.8", en: 'Sony FE 24-70mm f/2.8 Lens' },
    price: 69999,
    description: {
      uk: "Універсальний зум-об'єктив для професійної зйомки",
      en: 'Versatile zoom lens for professional photography'
    },
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&h=800&fit=crop',
    categoryKey: 'photo',
    subcategoryKey: 'lenses',
    brand: 'Sony'
  },
  // Додаткові годинники
  {
    id: 31,
    name: { uk: 'Samsung Galaxy Watch 5 Pro', en: 'Samsung Galaxy Watch 5 Pro' },
    price: 14999,
    description: {
      uk: 'Преміум розумний годинник з титановим корпусом, GPS, 80 годин роботи',
      en: 'Premium smartwatch with titanium case, GPS, 80 hours battery'
    },
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop',
    categoryKey: 'watches',
    subcategoryKey: 'smartwatches',
    brand: 'Samsung'
  },
  {
    id: 32,
    name: { uk: 'Класичний годинник Orient Bambino', en: 'Orient Bambino Classic Watch' },
    price: 7999,
    description: {
      uk: 'Елегантний механічний годинник, сапфірове скло, шкіряний ремінець',
      en: 'Elegant mechanical watch, sapphire crystal, leather strap'
    },
    image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800&h=800&fit=crop',
    categoryKey: 'watches',
    subcategoryKey: 'classic',
    brand: 'Orient'
  },
  // --- More products (expanded catalog) ---
  {
    id: 33,
    name: { uk: 'Ноутбук HP Spectre x360 14', en: 'HP Spectre x360 14 Laptop' },
    price: 57999,
    description: { uk: '14", OLED, Intel Core i7, 16GB RAM, 1TB SSD — преміум 2-в-1', en: '14\" OLED, Intel Core i7, 16GB RAM, 1TB SSD — premium 2-in-1' },
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=800&fit=crop',
    categoryKey: 'laptops',
    subcategoryKey: 'laptops-all',
    brand: 'HP'
  },
  {
    id: 34,
    name: { uk: 'Ноутбук Acer Swift 3', en: 'Acer Swift 3 Laptop' },
    price: 32999,
    description: { uk: '14", Ryzen 7, 16GB RAM, 512GB SSD — легкий для роботи та навчання', en: '14\", Ryzen 7, 16GB RAM, 512GB SSD — lightweight for work and study' },
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&h=800&fit=crop',
    categoryKey: 'laptops',
    subcategoryKey: 'laptops-all',
    brand: 'Acer'
  },
  {
    id: 35,
    name: { uk: 'Ноутбук MSI Katana 15', en: 'MSI Katana 15 Gaming Laptop' },
    price: 59999,
    description: { uk: '15.6", RTX графіка, 16GB RAM, 1TB SSD — для ігор та контенту', en: '15.6\", RTX graphics, 16GB RAM, 1TB SSD — gaming & content creation' },
    image: 'https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?w=800&h=800&fit=crop',
    categoryKey: 'laptops',
    subcategoryKey: 'laptops-all',
    brand: 'MSI'
  },
  {
    id: 36,
    name: { uk: 'Системний блок Lenovo Legion Tower', en: 'Lenovo Legion Tower Desktop PC' },
    price: 68999,
    description: { uk: 'Ігровий ПК: Ryzen 7, 32GB RAM, 1TB SSD, RTX 4070', en: 'Gaming PC: Ryzen 7, 32GB RAM, 1TB SSD, RTX 4070' },
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&h=800&fit=crop',
    categoryKey: 'laptops',
    subcategoryKey: 'desktops',
    brand: 'Lenovo'
  },
  {
    id: 37,
    name: { uk: 'Системний блок HP ProDesk SFF', en: 'HP ProDesk SFF Desktop PC' },
    price: 29999,
    description: { uk: 'Компактний офісний ПК: Intel Core i5, 16GB RAM, 512GB SSD', en: 'Compact office PC: Intel Core i5, 16GB RAM, 512GB SSD' },
    image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800&h=800&fit=crop',
    categoryKey: 'laptops',
    subcategoryKey: 'desktops',
    brand: 'HP'
  },
  {
    id: 38,
    name: { uk: 'Монітор LG UltraGear 27\"', en: 'LG UltraGear 27\" Monitor' },
    price: 13999,
    description: { uk: '27\" IPS, 144Hz, 1ms — ідеально для ігор', en: '27\" IPS, 144Hz, 1ms — perfect for gaming' },
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=800&fit=crop',
    categoryKey: 'laptops',
    subcategoryKey: 'monitors',
    brand: 'LG'
  },
  {
    id: 39,
    name: { uk: 'Монітор Samsung Smart Monitor M8', en: 'Samsung Smart Monitor M8' },
    price: 19999,
    description: { uk: '32\" 4K, Smart TV функції, USB‑C', en: '32\" 4K, Smart TV features, USB‑C' },
    image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&h=800&fit=crop',
    categoryKey: 'laptops',
    subcategoryKey: 'monitors',
    brand: 'Samsung'
  },
  {
    id: 40,
    name: { uk: 'iPhone 14', en: 'iPhone 14' },
    price: 36999,
    description: { uk: 'Apple смартфон: 128GB, подвійна камера, Face ID', en: 'Apple smartphone: 128GB, dual camera, Face ID' },
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&h=800&fit=crop',
    categoryKey: 'phones',
    subcategoryKey: 'phones-all',
    brand: 'Apple'
  },
  {
    id: 41,
    name: { uk: 'Samsung Galaxy A55', en: 'Samsung Galaxy A55' },
    price: 19999,
    description: { uk: 'AMOLED, 256GB, швидка зарядка — вигідний середній клас', en: 'AMOLED, 256GB, fast charging — great mid-range' },
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop',
    categoryKey: 'phones',
    subcategoryKey: 'phones-all',
    brand: 'Samsung'
  },
  {
    id: 42,
    name: { uk: 'Xiaomi Redmi Note 13 Pro', en: 'Xiaomi Redmi Note 13 Pro' },
    price: 15999,
    description: { uk: '120Hz AMOLED, 256GB, 200MP камера', en: '120Hz AMOLED, 256GB, 200MP camera' },
    image: 'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?w=800&h=800&fit=crop',
    categoryKey: 'phones',
    subcategoryKey: 'phones-all',
    brand: 'Xiaomi'
  },
  {
    id: 43,
    name: { uk: 'Чохол силіконовий для iPhone', en: 'Silicone Case for iPhone' },
    price: 699,
    description: { uk: 'М’який силікон, захист камери, сумісний з MagSafe', en: 'Soft silicone, camera protection, MagSafe compatible' },
    image: 'https://images.unsplash.com/photo-1601972602237-8c79241e468b?w=800&h=800&fit=crop',
    categoryKey: 'phones',
    subcategoryKey: 'phone-accessories',
    brand: 'Apple'
  },
  {
    id: 44,
    name: { uk: 'Повербанк 20 000 mAh USB‑C', en: '20,000mAh USB‑C Power Bank' },
    price: 1599,
    description: { uk: 'Швидка зарядка 22.5W, 2×USB + USB‑C', en: 'Fast charge 22.5W, 2×USB + USB‑C' },
    image: 'https://images.unsplash.com/photo-1601972602237-8c79241e468b?w=800&h=800&fit=crop',
    categoryKey: 'phones',
    subcategoryKey: 'phone-accessories',
    brand: 'Baseus'
  },
  {
    id: 45,
    name: { uk: 'Apple Watch SE', en: 'Apple Watch SE' },
    price: 12999,
    description: { uk: 'Розумний годинник з GPS, трекінг активності та здоров’я', en: 'Smartwatch with GPS, activity and health tracking' },
    image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=800&h=800&fit=crop',
    categoryKey: 'watches',
    subcategoryKey: 'smartwatches',
    brand: 'Apple'
  },
  {
    id: 46,
    name: { uk: 'Garmin Venu 3', en: 'Garmin Venu 3' },
    price: 18999,
    description: { uk: 'GPS, спорт-режими, автономність до 14 днів', en: 'GPS, sports modes, up to 14 days battery' },
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop',
    categoryKey: 'watches',
    subcategoryKey: 'smartwatches',
    brand: 'Garmin'
  },
  {
    id: 47,
    name: { uk: 'Класичний годинник Seiko 5', en: 'Seiko 5 Classic Watch' },
    price: 8999,
    description: { uk: 'Механіка, автопідзавод, нержавіюча сталь', en: 'Automatic mechanical, stainless steel' },
    image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800&h=800&fit=crop',
    categoryKey: 'watches',
    subcategoryKey: 'classic',
    brand: 'Seiko'
  },
  {
    id: 48,
    name: { uk: 'Навушники Bose QuietComfort Ultra', en: 'Bose QuietComfort Ultra Headphones' },
    price: 17999,
    description: { uk: 'ANC шумозаглушення, Bluetooth, до 24 годин', en: 'ANC noise cancelling, Bluetooth, up to 24 hours' },
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
    categoryKey: 'audio',
    subcategoryKey: 'headphones',
    brand: 'Bose'
  },
  {
    id: 49,
    name: { uk: 'Навушники Sennheiser Momentum 4', en: 'Sennheiser Momentum 4 Headphones' },
    price: 16999,
    description: { uk: 'Преміум звук, ANC, до 60 годин автономності', en: 'Premium sound, ANC, up to 60 hours battery' },
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
    categoryKey: 'audio',
    subcategoryKey: 'headphones',
    brand: 'Sennheiser'
  },
  {
    id: 50,
    name: { uk: 'Колонка JBL Charge 5', en: 'JBL Charge 5 Speaker' },
    price: 6999,
    description: { uk: 'Потужний бас, IP67, до 20 годин', en: 'Big bass, IP67, up to 20 hours' },
    image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=800&h=800&fit=crop',
    categoryKey: 'audio',
    subcategoryKey: 'speakers',
    brand: 'JBL'
  },
  {
    id: 51,
    name: { uk: 'Колонка Marshall Emberton II', en: 'Marshall Emberton II Speaker' },
    price: 8999,
    description: { uk: 'Фірмовий дизайн, 360° звук, IP67', en: 'Iconic design, 360° sound, IP67' },
    image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=800&h=800&fit=crop',
    categoryKey: 'audio',
    subcategoryKey: 'speakers',
    brand: 'Marshall'
  },
  {
    id: 52,
    name: { uk: 'iPad (10th Gen)', en: 'iPad (10th Gen)' },
    price: 21999,
    description: { uk: '10.9\", 64GB, Wi‑Fi — універсальний планшет', en: '10.9\", 64GB, Wi‑Fi — all‑around tablet' },
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=800&fit=crop',
    categoryKey: 'tablets',
    subcategoryKey: 'tablets-all',
    brand: 'Apple'
  },
  {
    id: 53,
    name: { uk: 'Samsung Galaxy Tab A9+', en: 'Samsung Galaxy Tab A9+' },
    price: 11999,
    description: { uk: '11\", 128GB, Dolby Atmos — для навчання та відео', en: '11\", 128GB, Dolby Atmos — study & video' },
    image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&h=800&fit=crop',
    categoryKey: 'tablets',
    subcategoryKey: 'tablets-all',
    brand: 'Samsung'
  },
  {
    id: 54,
    name: { uk: 'Фотоапарат Fujifilm X-T5', en: 'Fujifilm X-T5 Camera' },
    price: 74999,
    description: { uk: '40MP, 4K, стабілізація — для фото та відео', en: '40MP, 4K, stabilization — photo & video' },
    image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&h=800&fit=crop',
    categoryKey: 'photo',
    subcategoryKey: 'cameras',
    brand: 'Fujifilm'
  },
  {
    id: 55,
    name: { uk: 'Фотоапарат Nikon Z6 II', en: 'Nikon Z6 II Camera' },
    price: 79999,
    description: { uk: 'Full-frame, 4K, швидкий автофокус', en: 'Full-frame, 4K, fast autofocus' },
    image: 'https://images.unsplash.com/photo-1519183071298-a2962be96c09?w=800&h=800&fit=crop',
    categoryKey: 'photo',
    subcategoryKey: 'cameras',
    brand: 'Nikon'
  },
  {
    id: 56,
    name: { uk: "Об'єктив Sigma 35mm f/1.4", en: 'Sigma 35mm f/1.4 Lens' },
    price: 25999,
    description: { uk: 'Світлосильний фікс для портретів та репортажу', en: 'Fast prime for portraits and street photography' },
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&h=800&fit=crop',
    categoryKey: 'photo',
    subcategoryKey: 'lenses',
    brand: 'Sigma'
  },
  {
    id: 57,
    name: { uk: "Об'єктив Tamron 28-75mm f/2.8", en: 'Tamron 28-75mm f/2.8 Lens' },
    price: 32999,
    description: { uk: 'Універсальний зум для подорожей та роботи', en: 'Versatile zoom for travel and work' },
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&h=800&fit=crop',
    categoryKey: 'photo',
    subcategoryKey: 'lenses',
    brand: 'Tamron'
  },
  {
    id: 58,
    name: { uk: 'Ноутбук ASUS Zenbook 14', en: 'ASUS Zenbook 14 Laptop' },
    price: 41999,
    description: { uk: '14\", OLED, 16GB RAM, 512GB SSD — стильний ультрабук', en: '14\" OLED, 16GB RAM, 512GB SSD — stylish ultrabook' },
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=800&fit=crop',
    categoryKey: 'laptops',
    subcategoryKey: 'laptops-all',
    brand: 'ASUS'
  },
  {
    id: 59,
    name: { uk: 'Монітор ASUS ProArt 27\"', en: 'ASUS ProArt 27\" Monitor' },
    price: 21999,
    description: { uk: '27\" 4K IPS, 100% sRGB — для дизайну', en: '27\" 4K IPS, 100% sRGB — for creators' },
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=800&fit=crop',
    categoryKey: 'laptops',
    subcategoryKey: 'monitors',
    brand: 'ASUS'
  },
  {
    id: 60,
    name: { uk: 'Навушники Beats Studio Pro', en: 'Beats Studio Pro Headphones' },
    price: 14999,
    description: { uk: 'Bluetooth, ANC, просторовий звук', en: 'Bluetooth, ANC, spatial audio' },
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
    categoryKey: 'audio',
    subcategoryKey: 'headphones',
    brand: 'Beats'
  },
  {
    id: 61,
    name: { uk: 'Смартфон Google Pixel 8', en: 'Google Pixel 8 Smartphone' },
    price: 32999,
    description: { uk: 'Камера з AI, 128GB, чистий Android', en: 'AI camera, 128GB, clean Android' },
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop',
    categoryKey: 'phones',
    subcategoryKey: 'phones-all',
    brand: 'Google'
  },
  {
    id: 62,
    name: { uk: 'Зарядний пристрій USB‑C 45W', en: 'USB‑C 45W Charger' },
    price: 999,
    description: { uk: 'Швидка зарядка PD, компактний адаптер', en: 'Fast PD charging, compact adapter' },
    image: 'https://images.unsplash.com/photo-1601972602237-8c79241e468b?w=800&h=800&fit=crop',
    categoryKey: 'phones',
    subcategoryKey: 'phone-accessories',
    brand: 'Anker'
  },
  {
    id: 63,
    name: { uk: 'Apple iPad mini', en: 'Apple iPad mini' },
    price: 23999,
    description: { uk: '8.3\", 64GB, Wi‑Fi — компактний і швидкий', en: '8.3\", 64GB, Wi‑Fi — compact and fast' },
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=800&fit=crop',
    categoryKey: 'tablets',
    subcategoryKey: 'tablets-all',
    brand: 'Apple'
  },
  {
    id: 64,
    name: { uk: 'Камера GoPro HERO12', en: 'GoPro HERO12 Action Camera' },
    price: 17999,
    description: { uk: '5.3K відео, стабілізація, водозахист', en: '5.3K video, stabilization, waterproof' },
    image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&h=800&fit=crop',
    categoryKey: 'photo',
    subcategoryKey: 'cameras',
    brand: 'GoPro'
  },
  {
    id: 65,
    name: { uk: 'Годинник Casio G‑Shock', en: 'Casio G‑Shock Watch' },
    price: 6999,
    description: { uk: 'Ударостійкий, водозахист, підсвітка', en: 'Shock resistant, water resistant, backlight' },
    image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800&h=800&fit=crop',
    categoryKey: 'watches',
    subcategoryKey: 'classic',
    brand: 'Casio'
  },
  {
    id: 66,
    name: { uk: 'Колонка Sony SRS-XG300', en: 'Sony SRS-XG300 Speaker' },
    price: 9999,
    description: { uk: 'Потужний звук, підсвітка, до 25 годин', en: 'Powerful sound, lighting, up to 25 hours' },
    image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=800&h=800&fit=crop',
    categoryKey: 'audio',
    subcategoryKey: 'speakers',
    brand: 'Sony'
  },
  {
    id: 67,
    name: { uk: 'Навушники Apple AirPods (3 gen)', en: 'Apple AirPods (3rd gen)' },
    price: 6999,
    description: { uk: 'Просторовий звук, зарядка MagSafe, комфортна посадка', en: 'Spatial audio, MagSafe charging, comfortable fit' },
    image: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=800&h=800&fit=crop',
    categoryKey: 'audio',
    subcategoryKey: 'headphones',
    brand: 'Apple'
  },
  {
    id: 68,
    name: { uk: 'Ноутбук Lenovo ThinkPad X1 Carbon', en: 'Lenovo ThinkPad X1 Carbon Laptop' },
    price: 71999,
    description: { uk: '14\", бізнес‑клас, Intel Core i7, 16GB RAM, 1TB SSD', en: '14\" business class, Intel Core i7, 16GB RAM, 1TB SSD' },
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=800&fit=crop',
    categoryKey: 'laptops',
    subcategoryKey: 'laptops-all',
    brand: 'Lenovo'
  },
  {
    id: 69,
    name: { uk: 'Монітор Dell 24\" IPS', en: 'Dell 24\" IPS Monitor' },
    price: 8999,
    description: { uk: '24\" Full HD, IPS, тонкі рамки', en: '24\" Full HD, IPS, slim bezels' },
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=800&fit=crop',
    categoryKey: 'laptops',
    subcategoryKey: 'monitors',
    brand: 'Dell'
  },
  {
    id: 70,
    name: { uk: 'Системний блок MSI Creator P100', en: 'MSI Creator P100 Desktop PC' },
    price: 89999,
    description: { uk: 'Для роботи з графікою: Intel Core i9, 32GB RAM, 2TB SSD', en: 'For creators: Intel Core i9, 32GB RAM, 2TB SSD' },
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&h=800&fit=crop',
    categoryKey: 'laptops',
    subcategoryKey: 'desktops',
    brand: 'MSI'
  },
  {
    id: 71,
    name: { uk: 'Смартфон OnePlus 12', en: 'OnePlus 12 Smartphone' },
    price: 33999,
    description: { uk: '120Hz AMOLED, 256GB, швидка зарядка 100W', en: '120Hz AMOLED, 256GB, 100W fast charging' },
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop',
    categoryKey: 'phones',
    subcategoryKey: 'phones-all',
    brand: 'OnePlus'
  },
  {
    id: 72,
    name: { uk: 'Скло захисне 9H для смартфона', en: '9H Tempered Glass Screen Protector' },
    price: 399,
    description: { uk: 'Повне покриття, олеофобне покриття, легке встановлення', en: 'Full coverage, oleophobic coating, easy install' },
    image: 'https://images.unsplash.com/photo-1601972602237-8c79241e468b?w=800&h=800&fit=crop',
    categoryKey: 'phones',
    subcategoryKey: 'phone-accessories',
    brand: 'Generic'
  }
];
