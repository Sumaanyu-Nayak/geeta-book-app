import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../features/home/presentation/pages/home_page.dart';
import '../../features/chapter/presentation/pages/chapter_detail_page.dart';
import '../../features/verse/presentation/pages/verse_list_page.dart';
import '../../features/verse/presentation/pages/verse_detail_page.dart';
import '../../features/verse/presentation/pages/verse_activities_page.dart';
import '../../features/verse/presentation/pages/activity_detail_page.dart';
import '../../features/chapter/presentation/pages/chapter_activities_page.dart';
import '../../features/qr_scanner/presentation/pages/qr_scanner_page.dart';

final routerProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    initialLocation: '/',
    routes: [
      GoRoute(
        path: '/',
        name: 'home',
        builder: (context, state) => const HomePage(),
      ),
      GoRoute(
        path: '/chapter/:id',
        name: 'chapter',
        builder: (context, state) {
          final chapterId = state.pathParameters['id']!;
          return ChapterDetailPage(chapterId: chapterId);
        },
      ),
      GoRoute(
        path: '/chapter/:chapterId/activities',
        name: 'chapterActivities',
        builder: (context, state) {
          final chapterId = state.pathParameters['chapterId']!;
          return ChapterActivitiesPage(chapterId: chapterId);
        },
      ),
      GoRoute(
        path: '/chapter/:chapterId/verses',
        name: 'verses',
        builder: (context, state) {
          final chapterId = state.pathParameters['chapterId']!;
          return VerseListPage(chapterId: chapterId);
        },
      ),
      GoRoute(
        path: '/chapter/:chapterId/verse/:verseId',
        name: 'verse',
        builder: (context, state) {
          final chapterId = state.pathParameters['chapterId']!;
          final verseId = state.pathParameters['verseId']!;
          return VerseDetailPage(
            chapterId: chapterId,
            verseId: verseId,
          );
        },
      ),
      GoRoute(
        path: '/chapter/:chapterId/verse/:verseNumber/activities',
        name: 'verseActivities',
        builder: (context, state) {
          final chapterId = state.pathParameters['chapterId']!;
          final verseNumber = int.parse(state.pathParameters['verseNumber']!);
          return VerseActivitiesPage(
            chapterId: chapterId,
            verseNumber: verseNumber,
          );
        },
      ),
      GoRoute(
        path: '/chapter/:chapterId/verse/:verseNumber/activity/:activityId',
        name: 'activityDetail',
        builder: (context, state) {
          final activityId = state.pathParameters['activityId']!;
          return ActivityDetailPage(activityId: activityId);
        },
      ),
      GoRoute(
        path: '/qr-scanner',
        name: 'qrScanner',
        builder: (context, state) => const QRScannerPage(),
      ),
    ],
  );
});

// Theme Mode Provider
final themeModeProvider = StateNotifierProvider<ThemeModeNotifier, ThemeMode>(
  (ref) => ThemeModeNotifier(),
);

class ThemeModeNotifier extends StateNotifier<ThemeMode> {
  ThemeModeNotifier() : super(ThemeMode.light) {
    _loadThemeMode();
  }

  Future<void> _loadThemeMode() async {
    final prefs = await SharedPreferences.getInstance();
    final isDark = prefs.getBool('isDarkMode') ?? false;
    state = isDark ? ThemeMode.dark : ThemeMode.light;
  }

  Future<void> toggleTheme() async {
    final prefs = await SharedPreferences.getInstance();
    final isDark = state == ThemeMode.dark;
    await prefs.setBool('isDarkMode', !isDark);
    state = isDark ? ThemeMode.light : ThemeMode.dark;
  }
}
