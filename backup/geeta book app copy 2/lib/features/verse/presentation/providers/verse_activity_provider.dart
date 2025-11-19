import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../core/config/app_config.dart';
import '../../../../shared/data/repositories/verse_activity_repository.dart';
import '../../../../shared/domain/models/verse_activity.dart';

// Dio Provider
final _dioProvider = Provider<Dio>((ref) {
  return Dio(BaseOptions(
    baseUrl: AppConfig.apiBaseUrl,
  ));
});

// Repository Provider
final verseActivityRepositoryProvider = Provider<VerseActivityRepository>((ref) {
  final dio = ref.watch(_dioProvider);
  return VerseActivityRepository(dio);
});

// Get activities for a specific verse
final verseActivitiesProvider = FutureProvider.family<List<VerseActivity>, ({String chapterId, int verseNumber})>(
  (ref, params) async {
    final repository = ref.watch(verseActivityRepositoryProvider);
    return repository.getActivitiesByVerse(
      chapterId: params.chapterId,
      verseNumber: params.verseNumber,
    );
  },
);

// Get activities for a chapter
final chapterActivitiesProvider = FutureProvider.family<List<VerseActivity>, String>(
  (ref, chapterId) async {
    final repository = ref.watch(verseActivityRepositoryProvider);
    return repository.getActivitiesByChapter(chapterId);
  },
);

// Get single activity by ID
final singleActivityProvider = FutureProvider.family<VerseActivity, String>(
  (ref, activityId) async {
    final repository = ref.watch(verseActivityRepositoryProvider);
    return repository.getActivityById(activityId);
  },
);
