import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useI18n } from '../i18n/I18nProvider';
import './PersonalCabinet.css';

export const PersonalCabinet: React.FC = () => {
  const { t } = useI18n();
  const { user, logout, updateUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return null;
  }
  const [profile, setProfile] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    address: user.address || '',
    avatar: user.avatar || null
  });
  
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        avatar: user.avatar || null
      });
      if (user.avatar) {
        setAvatarPreview(user.avatar);
      }
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Перевіряємо тип файлу
      if (!file.type.startsWith('image/')) {
        alert(t('profile.pickImage'));
        return;
      }

      // Перевіряємо розмір файлу (макс 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert(t('profile.maxSizeAlert'));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setAvatarPreview(base64String);
        setProfile(prev => ({
          ...prev,
          avatar: base64String
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarPreview(null);
    setProfile(prev => ({
      ...prev,
      avatar: null
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Оновлюємо профіль користувача через контекст
    updateUser({
      name: profile.name,
      phone: profile.phone,
      address: profile.address,
      avatar: profile.avatar
    });
    alert(t('profile.saved'));
  };

  return (
    <div className="personal-cabinet">
      <div className="cabinet-container">
        <h1 className="cabinet-title">{t('profile.title')}</h1>
        
        <div className="cabinet-content">
          <div className="profile-section">
            <div className="avatar-section">
              <div className="avatar-container">
                {avatarPreview ? (
                  <img src={avatarPreview} alt={t('profile.title')} className="avatar-image" />
                ) : (
                  <div className="avatar-placeholder">
                    <span className="avatar-icon">👤</span>
                  </div>
                )}
                <div className="avatar-overlay">
                  <button
                    type="button"
                    className="avatar-btn"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    📷 {t('profile.changePhoto')}
                  </button>
                  {avatarPreview && (
                    <button
                      type="button"
                      className="avatar-btn remove"
                      onClick={handleRemoveAvatar}
                    >
                      🗑️ {t('profile.remove')}
                    </button>
                  )}
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: 'none' }}
              />
              <p className="avatar-hint">{t('profile.maxSize')}</p>
            </div>
          </div>

          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">{t('profile.nameLabel')}</label>
              <input
                type="text"
                id="name"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                placeholder={t('profile.namePlaceholder')}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">{t('profile.emailLabel')}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                placeholder="example@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">{t('profile.phoneLabel')}</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={profile.phone}
                onChange={handleInputChange}
                placeholder="+380 XX XXX XX XX"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">{t('profile.addressLabel')}</label>
              <textarea
                id="address"
                name="address"
                value={profile.address}
                onChange={handleInputChange}
                placeholder={t('profile.addressPlaceholder')}
                rows={3}
              />
            </div>

            <div className="profile-actions">
              <button type="submit" className="save-btn btn-primary">
                {t('profile.save')}
              </button>
              <button
                type="button"
                className="logout-btn btn-secondary"
                onClick={() => {
                  logout();
                  navigate('/');
                }}
              >
                {t('profile.logout')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
