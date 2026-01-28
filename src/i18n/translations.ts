export type Lang = 'uk' | 'en';

export type TranslationKey =
  | 'nav.promos'
  | 'nav.delivery'
  | 'nav.returns'
  | 'nav.help'
  | 'header.catalog'
  | 'header.searchPlaceholder'
  | 'header.favorites'
  | 'header.cart'
  | 'header.profile'
  | 'catalog.title'
  | 'catalog.close'
  | 'catalog.viewAll'
  | 'catalog.back'
  | 'cart.title'
  | 'cart.total'
  | 'cart.checkout'
  | 'checkout.title'
  | 'checkout.back'
  | 'checkout.emptyTitle'
  | 'checkout.emptyText'
  | 'checkout.backToShop'
  | 'checkout.contactTitle'
  | 'checkout.name'
  | 'checkout.email'
  | 'checkout.phone'
  | 'checkout.addressTitle'
  | 'checkout.city'
  | 'checkout.address'
  | 'checkout.postalCode'
  | 'checkout.deliveryTitle'
  | 'checkout.delivery.courier'
  | 'checkout.delivery.pickup'
  | 'checkout.paymentTitle'
  | 'checkout.payment.card'
  | 'checkout.payment.cash'
  | 'checkout.confirm'
  | 'checkout.orderTitle'
  | 'checkout.itemsCount'
  | 'checkout.shipping'
  | 'checkout.shipping.free'
  | 'checkout.shipping.carrier'
  | 'checkout.toPay'
  | 'bestOffers.title'
  | 'bestOffers.viewAll'
  | 'category.catalog'
  | 'category.search'
  | 'chat.title'
  | 'chat.online'
  | 'chat.placeholder'
  | 'chat.greeting'
  | 'chat.addToCart'
  | 'products.catalogTitle'
  | 'products.notFound'
  | 'profile.title'
  | 'profile.changePhoto'
  | 'profile.maxSize'
  | 'profile.save'
  | 'profile.pickImage'
  | 'profile.maxSizeAlert'
  | 'profile.saved'
  | 'product.addToCart'
  | 'product.addedToCart'
  | 'product.notFound'
  | 'product.backToCatalog'
  | 'product.specs'
  | 'product.spec.category'
  | 'product.spec.price'
  | 'product.spec.id'
  | 'product.spec.brand'
  | 'header.storeName'
  | 'header.voiceSearch'
  | 'profile.remove'
  | 'profile.nameLabel'
  | 'profile.namePlaceholder'
  | 'profile.emailLabel'
  | 'profile.phoneLabel'
  | 'profile.addressLabel'
  | 'profile.addressPlaceholder'
  | 'checkout.itemsSuffix'
  | 'bestOffers.discount'
  | 'bestOffers.favorite'
  | 'bestOffers.addToCart'
  | 'category.delivery'
  | 'category.deliveryPrice'
  | 'category.bonus'
  | 'bottomNav.home'
  | 'bottomNav.catalog'
  | 'bottomNav.cart'
  | 'bottomNav.favorites'
  | 'bottomNav.account'
  | 'mobile.catalog'
  | 'productOfDay.title'
  | 'productOfDay.day'
  | 'productOfDay.hours'
  | 'productOfDay.minutes'
  | 'auth.login'
  | 'auth.register'
  | 'auth.loginTitle'
  | 'auth.registerTitle'
  | 'auth.name'
  | 'auth.namePlaceholder'
  | 'auth.email'
  | 'auth.emailPlaceholder'
  | 'auth.password'
  | 'auth.passwordPlaceholder'
  | 'auth.loginBtn'
  | 'auth.registerBtn'
  | 'auth.backToHome'
  | 'auth.invalidCredentials'
  | 'auth.emailExists'
  | 'auth.nameRequired'
  | 'auth.error'
  | 'auth.loading'
  | 'header.login'
  | 'profile.logout';

export const translations: Record<Lang, Record<TranslationKey, string>> = {
  uk: {
    'nav.promos': 'Акції',
    'nav.delivery': 'Доставка',
    'nav.returns': 'Повернення',
    'nav.help': 'Допомога',
    'header.catalog': 'Каталог',
    'header.searchPlaceholder': 'Шукати товари...',
    'header.favorites': 'Обране',
    'header.cart': 'Кошик',
    'header.profile': 'Особистий кабінет',
    'catalog.title': 'Каталог',
    'catalog.close': 'Закрити каталог',
    'catalog.viewAll': 'Дивитися всі',
    'catalog.back': 'На головну',
    'cart.title': 'Кошик',
    'cart.total': 'Всього:',
    'cart.checkout': 'Оформити замовлення',
    'checkout.title': 'Оформлення замовлення',
    'checkout.back': 'Назад',
    'checkout.emptyTitle': 'Кошик порожній',
    'checkout.emptyText': 'Додайте товари до кошика, щоб оформити замовлення',
    'checkout.backToShop': 'Повернутися до магазину',
    'checkout.contactTitle': 'Контактна інформація',
    'checkout.name': "Ім'я та прізвище",
    'checkout.email': 'Електронна пошта',
    'checkout.phone': 'Номер телефону',
    'checkout.addressTitle': 'Адреса доставки',
    'checkout.city': 'Місто',
    'checkout.address': 'Адреса',
    'checkout.postalCode': 'Поштовий індекс',
    'checkout.deliveryTitle': 'Спосіб доставки',
    'checkout.delivery.courier': "Кур'єрська доставка",
    'checkout.delivery.pickup': 'Самовивіз з магазину',
    'checkout.paymentTitle': 'Спосіб оплати',
    'checkout.payment.card': 'Банківська картка',
    'checkout.payment.cash': 'Готівка при отриманні',
    'checkout.confirm': 'Підтвердити замовлення',
    'checkout.orderTitle': 'Ваше замовлення',
    'checkout.itemsCount': 'Товарів:',
    'checkout.shipping': 'Доставка:',
    'checkout.shipping.free': 'Безкоштовно',
    'checkout.shipping.carrier': 'За тарифами перевізника',
    'checkout.toPay': 'До сплати:',
    'bestOffers.title': 'Найкращі пропозиції',
    'bestOffers.viewAll': 'Дивитися всі →',
    'category.catalog': 'Каталог',
    'category.search': 'Пошук:',
    'category.delivery': 'ДОСТАВИМО за',
    'category.deliveryPrice': '1₴',
    'category.bonus': 'на бонусний рахунок',
    'bottomNav.home': 'Головна',
    'bottomNav.catalog': 'Каталог',
    'bottomNav.cart': 'Кошик',
    'bottomNav.favorites': 'Обране',
    'bottomNav.account': 'Кабінет',
    'mobile.catalog': 'Каталог товарів',
    'productOfDay.title': 'Товар дня',
    'productOfDay.day': 'день',
    'productOfDay.hours': 'годин',
    'productOfDay.minutes': 'хвилин',
    'chat.title': 'Віртуальний асистент',
    'chat.online': 'Онлайн',
    'chat.placeholder': 'Напишіть повідомлення...',
    'chat.greeting': 'Привіт! Я ваш віртуальний асистент. Чим можу допомогти?',
    'chat.addToCart': 'Додати до кошика',
    'products.catalogTitle': 'Каталог товарів',
    'products.notFound': 'Товари не знайдено',
    'profile.title': 'Особистий кабінет',
    'profile.changePhoto': 'Змінити фото',
    'profile.maxSize': 'Максимальний розмір: 5MB',
    'profile.save': 'Зберегти зміни',
    'profile.pickImage': 'Будь ласка, виберіть зображення',
    'profile.maxSizeAlert': 'Розмір файлу не повинен перевищувати 5MB',
    'profile.saved': 'Профіль успішно збережено!',
    'header.storeName': 'Магазин',
    'header.voiceSearch': 'Голосовий пошук',
    'profile.remove': 'Видалити',
    'profile.nameLabel': "Ім'я та прізвище",
    'profile.namePlaceholder': "Введіть ваше ім'я",
    'profile.emailLabel': 'Електронна пошта',
    'profile.phoneLabel': 'Номер телефону',
    'profile.addressLabel': 'Адреса доставки',
    'profile.addressPlaceholder': 'Введіть адресу доставки',
    'checkout.itemsSuffix': 'шт.',
    'bestOffers.discount': 'Вигода',
    'bestOffers.favorite': 'Додати в обране',
    'bestOffers.addToCart': 'Додати до кошика',
    'product.addToCart': 'Додати до кошика',
    'product.addedToCart': 'Товар додано до кошика!',
    'product.notFound': 'Товар не знайдено',
    'product.backToCatalog': 'Повернутися до каталогу',
    'product.specs': 'Характеристики',
    'product.spec.category': 'Категорія:',
    'product.spec.price': 'Ціна:',
    'product.spec.id': 'ID товару:',
    'product.spec.brand': 'Бренд:',
    'auth.login': 'Увійти',
    'auth.register': 'Реєстрація',
    'auth.loginTitle': 'Вхід в акаунт',
    'auth.registerTitle': 'Створення акаунту',
    'auth.name': "Ім'я",
    'auth.namePlaceholder': "Введіть ваше ім'я",
    'auth.email': 'Електронна пошта',
    'auth.emailPlaceholder': 'example@email.com',
    'auth.password': 'Пароль',
    'auth.passwordPlaceholder': 'Мінімум 6 символів',
    'auth.loginBtn': 'Увійти',
    'auth.registerBtn': 'Зареєструватись',
    'auth.backToHome': 'Повернутися на головну',
    'auth.invalidCredentials': 'Невірний email або пароль',
    'auth.emailExists': 'Користувач з таким email вже існує',
    'auth.nameRequired': "Введіть ваше ім'я",
    'auth.error': 'Сталася помилка. Спробуйте ще раз.',
    'auth.loading': 'Завантаження...',
    'header.login': 'Увійти',
    'profile.logout': 'Вийти'
  },
  en: {
    'nav.promos': 'Deals',
    'nav.delivery': 'Delivery',
    'nav.returns': 'Returns',
    'nav.help': 'Help',
    'header.catalog': 'Catalog',
    'header.searchPlaceholder': 'Search products...',
    'header.favorites': 'Favorites',
    'header.cart': 'Cart',
    'header.profile': 'Profile',
    'catalog.title': 'Catalog',
    'catalog.close': 'Close catalog',
    'catalog.viewAll': 'View all',
    'catalog.back': 'Home',
    'cart.title': 'Cart',
    'cart.total': 'Total:',
    'cart.checkout': 'Checkout',
    'checkout.title': 'Checkout',
    'checkout.back': 'Back',
    'checkout.emptyTitle': 'Your cart is empty',
    'checkout.emptyText': 'Add items to your cart to place an order',
    'checkout.backToShop': 'Back to shop',
    'checkout.contactTitle': 'Contact information',
    'checkout.name': 'Full name',
    'checkout.email': 'Email',
    'checkout.phone': 'Phone number',
    'checkout.addressTitle': 'Delivery address',
    'checkout.city': 'City',
    'checkout.address': 'Address',
    'checkout.postalCode': 'Postal code',
    'checkout.deliveryTitle': 'Delivery method',
    'checkout.delivery.courier': 'Courier delivery',
    'checkout.delivery.pickup': 'Store pickup',
    'checkout.paymentTitle': 'Payment method',
    'checkout.payment.card': 'Card',
    'checkout.payment.cash': 'Cash on delivery',
    'checkout.confirm': 'Confirm order',
    'checkout.orderTitle': 'Your order',
    'checkout.itemsCount': 'Items:',
    'checkout.shipping': 'Shipping:',
    'checkout.shipping.free': 'Free',
    'checkout.shipping.carrier': 'Carrier rates apply',
    'checkout.toPay': 'Amount due:',
    'bestOffers.title': 'Best offers',
    'bestOffers.viewAll': 'View all →',
    'category.catalog': 'Catalog',
    'category.search': 'Search:',
    'category.delivery': 'DELIVER for',
    'category.deliveryPrice': '1₴',
    'category.bonus': 'to bonus account',
    'bottomNav.home': 'Home',
    'bottomNav.catalog': 'Catalog',
    'bottomNav.cart': 'Cart',
    'bottomNav.favorites': 'Favorites',
    'bottomNav.account': 'Account',
    'mobile.catalog': 'Product Catalog',
    'productOfDay.title': 'Product of the day',
    'productOfDay.day': 'day',
    'productOfDay.hours': 'hours',
    'productOfDay.minutes': 'minutes',
    'chat.title': 'Virtual assistant',
    'chat.online': 'Online',
    'chat.placeholder': 'Type a message...',
    'chat.greeting': 'Hi! I am your virtual assistant. How can I help?',
    'chat.addToCart': 'Add to cart',
    'products.catalogTitle': 'Product catalog',
    'products.notFound': 'No products found',
    'profile.title': 'Profile',
    'profile.changePhoto': 'Change photo',
    'profile.maxSize': 'Max size: 5MB',
    'profile.save': 'Save changes',
    'profile.pickImage': 'Please select an image',
    'profile.maxSizeAlert': 'File size must not exceed 5MB',
    'profile.saved': 'Profile saved successfully!',
    'header.storeName': 'Store',
    'header.voiceSearch': 'Voice search',
    'profile.remove': 'Remove',
    'profile.nameLabel': 'Full name',
    'profile.namePlaceholder': 'Enter your name',
    'profile.emailLabel': 'Email',
    'profile.phoneLabel': 'Phone number',
    'profile.addressLabel': 'Delivery address',
    'profile.addressPlaceholder': 'Enter delivery address',
    'checkout.itemsSuffix': 'pcs',
    'bestOffers.discount': 'Save',
    'bestOffers.favorite': 'Add to favorites',
    'bestOffers.addToCart': 'Add to cart',
    'product.addToCart': 'Add to cart',
    'product.addedToCart': 'Added to cart!',
    'product.notFound': 'Product not found',
    'product.backToCatalog': 'Back to catalog',
    'product.specs': 'Specifications',
    'product.spec.category': 'Category:',
    'product.spec.price': 'Price:',
    'product.spec.id': 'Product ID:',
    'product.spec.brand': 'Brand:',
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.loginTitle': 'Sign in',
    'auth.registerTitle': 'Create account',
    'auth.name': 'Name',
    'auth.namePlaceholder': 'Enter your name',
    'auth.email': 'Email',
    'auth.emailPlaceholder': 'example@email.com',
    'auth.password': 'Password',
    'auth.passwordPlaceholder': 'Minimum 6 characters',
    'auth.loginBtn': 'Sign in',
    'auth.registerBtn': 'Sign up',
    'auth.backToHome': 'Back to home',
    'auth.invalidCredentials': 'Invalid email or password',
    'auth.emailExists': 'User with this email already exists',
    'auth.nameRequired': 'Please enter your name',
    'auth.error': 'An error occurred. Please try again.',
    'auth.loading': 'Loading...',
    'header.login': 'Login',
    'profile.logout': 'Logout'
  }
};

