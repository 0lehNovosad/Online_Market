export interface CatalogItem {
  key: string; // stable token for filtering (e.g. 'apple', 'dell', 'wireless')
  label: { uk: string; en: string };
}

export interface Subcategory {
  key: string;
  label: { uk: string; en: string };
  items?: CatalogItem[];
}

export interface CategoryData {
  key: string; // stable route key (e.g. 'laptops')
  label: { uk: string; en: string };
  icon: string;
  subcategories: Subcategory[];
}

export const categoriesData: CategoryData[] = [
  {
    key: 'laptops',
    label: { uk: 'Ноутбуки', en: 'Laptops' },
    icon: '💻',
    subcategories: [
      {
        key: 'laptops-all',
        label: { uk: 'Ноутбуки', en: 'Laptops' },
        items: [
          { key: 'apple', label: { uk: 'Apple', en: 'Apple' } },
          { key: 'dell', label: { uk: 'Dell', en: 'Dell' } },
          { key: 'asus', label: { uk: 'ASUS', en: 'ASUS' } },
          { key: 'lenovo', label: { uk: 'Lenovo', en: 'Lenovo' } },
          { key: 'hp', label: { uk: 'HP', en: 'HP' } },
          { key: 'acer', label: { uk: 'Acer', en: 'Acer' } },
          { key: 'msi', label: { uk: 'MSI', en: 'MSI' } }
        ]
      },
      {
        key: 'desktops',
        label: { uk: 'Системні блоки (ПК)', en: 'Desktops (PC)' },
        items: [
          { key: 'asus', label: { uk: 'ASUS', en: 'ASUS' } },
          { key: 'dell', label: { uk: 'Dell', en: 'Dell' } },
          { key: 'lenovo', label: { uk: 'Lenovo', en: 'Lenovo' } },
          { key: 'hp', label: { uk: 'HP', en: 'HP' } },
          { key: 'msi', label: { uk: 'MSI', en: 'MSI' } }
        ]
      },
      {
        key: 'monitors',
        label: { uk: 'Монітори', en: 'Monitors' },
        items: [
          { key: 'dell', label: { uk: 'Dell', en: 'Dell' } },
          { key: 'asus', label: { uk: 'ASUS', en: 'ASUS' } },
          { key: 'lg', label: { uk: 'LG', en: 'LG' } },
          { key: 'samsung', label: { uk: 'Samsung', en: 'Samsung' } }
        ]
      }
    ]
  },
  {
    key: 'phones',
    label: { uk: 'Смартфони', en: 'Smartphones' },
    icon: '📱',
    subcategories: [
      {
        key: 'phones-all',
        label: { uk: 'Смартфони', en: 'Smartphones' },
        items: [
          { key: 'apple', label: { uk: 'Apple iPhone', en: 'Apple iPhone' } },
          { key: 'samsung', label: { uk: 'Samsung', en: 'Samsung' } },
          { key: 'xiaomi', label: { uk: 'Xiaomi', en: 'Xiaomi' } },
          { key: 'google', label: { uk: 'Google Pixel', en: 'Google Pixel' } },
          { key: 'oneplus', label: { uk: 'OnePlus', en: 'OnePlus' } }
        ]
      },
      {
        key: 'phone-accessories',
        label: { uk: 'Аксесуари для смартфонів', en: 'Phone accessories' },
        items: [
          { key: 'apple', label: { uk: 'Apple', en: 'Apple' } },
          { key: 'samsung', label: { uk: 'Samsung', en: 'Samsung' } },
          { key: 'xiaomi', label: { uk: 'Xiaomi', en: 'Xiaomi' } },
          { key: 'anker', label: { uk: 'Anker', en: 'Anker' } },
          { key: 'baseus', label: { uk: 'Baseus', en: 'Baseus' } },
          { key: 'generic', label: { uk: 'Інше', en: 'Other' } }
        ]
      }
    ]
  },
  {
    key: 'watches',
    label: { uk: 'Годинники', en: 'Watches' },
    icon: '⌚',
    subcategories: [
      {
        key: 'smartwatches',
        label: { uk: 'Розумні годинники', en: 'Smartwatches' },
        items: [
          { key: 'apple', label: { uk: 'Apple Watch', en: 'Apple Watch' } },
          { key: 'samsung', label: { uk: 'Samsung Galaxy Watch', en: 'Samsung Galaxy Watch' } },
          { key: 'casio', label: { uk: 'Casio', en: 'Casio' } },
          { key: 'garmin', label: { uk: 'Garmin', en: 'Garmin' } }
        ]
      },
      {
        key: 'classic',
        label: { uk: 'Класичні годинники', en: 'Classic watches' },
        items: [
          { key: 'casio', label: { uk: 'Casio', en: 'Casio' } },
          { key: 'seiko', label: { uk: 'Seiko', en: 'Seiko' } },
          { key: 'orient', label: { uk: 'Orient', en: 'Orient' } }
        ]
      }
    ]
  },
  {
    key: 'audio',
    label: { uk: 'Аудіо', en: 'Audio' },
    icon: '🎧',
    subcategories: [
      {
        key: 'headphones',
        label: { uk: 'Навушники', en: 'Headphones' },
        items: [
          { key: 'sony', label: { uk: 'Sony', en: 'Sony' } },
          { key: 'apple', label: { uk: 'Apple', en: 'Apple' } },
          { key: 'wireless', label: { uk: 'Бездротові', en: 'Wireless' } },
          { key: 'bose', label: { uk: 'Bose', en: 'Bose' } },
          { key: 'sennheiser', label: { uk: 'Sennheiser', en: 'Sennheiser' } },
          { key: 'beats', label: { uk: 'Beats', en: 'Beats' } }
        ]
      },
      {
        key: 'speakers',
        label: { uk: 'Колонки', en: 'Speakers' },
        items: [
          { key: 'jbl', label: { uk: 'JBL', en: 'JBL' } },
          { key: 'sony', label: { uk: 'Sony', en: 'Sony' } },
          { key: 'marshall', label: { uk: 'Marshall', en: 'Marshall' } }
        ]
      }
    ]
  },
  {
    key: 'tablets',
    label: { uk: 'Планшети', en: 'Tablets' },
    icon: '📱',
    subcategories: [
      {
        key: 'tablets-all',
        label: { uk: 'Планшети', en: 'Tablets' },
        items: [
          { key: 'apple', label: { uk: 'Apple iPad', en: 'Apple iPad' } },
          { key: 'samsung', label: { uk: 'Samsung', en: 'Samsung' } }
        ]
      }
    ]
  },
  {
    key: 'photo',
    label: { uk: 'Фото', en: 'Photo' },
    icon: '📷',
    subcategories: [
      {
        key: 'cameras',
        label: { uk: 'Фотоапарати', en: 'Cameras' },
        items: [
          { key: 'canon', label: { uk: 'Canon', en: 'Canon' } },
          { key: 'sony', label: { uk: 'Sony', en: 'Sony' } },
          { key: 'nikon', label: { uk: 'Nikon', en: 'Nikon' } },
          { key: 'fujifilm', label: { uk: 'Fujifilm', en: 'Fujifilm' } },
          { key: 'gopro', label: { uk: 'GoPro', en: 'GoPro' } }
        ]
      },
      {
        key: 'lenses',
        label: { uk: "Об'єктиви", en: 'Lenses' },
        items: [
          { key: 'canon', label: { uk: 'Canon', en: 'Canon' } },
          { key: 'sony', label: { uk: 'Sony', en: 'Sony' } },
          { key: 'sigma', label: { uk: 'Sigma', en: 'Sigma' } },
          { key: 'tamron', label: { uk: 'Tamron', en: 'Tamron' } }
        ]
      }
    ]
  }
];
