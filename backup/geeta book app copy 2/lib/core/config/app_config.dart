class AppConfig {
  static const String appName = 'Geeta Book';
  static const String apiBaseUrl = 'http://192.168.0.125:3000/api';
  static const String apiVersion = 'v1';
  
  // API Endpoints
  static const String chaptersEndpoint = '/chapters';
  static const String versesEndpoint = '/verses';
  static const String activitiesEndpoint = '/activities';
  static const String progressEndpoint = '/progress';
  
  // Local Storage Keys
  static const String themeKey = 'theme_mode';
  static const String languageKey = 'language';
  static const String progressKey = 'user_progress';
  
  // Cache Duration
  static const Duration cacheExpiry = Duration(days: 7);
  
  // Pagination
  static const int itemsPerPage = 20;
  
  static Future<void> initialize() async {
    // Add any initialization logic here
  }
}
