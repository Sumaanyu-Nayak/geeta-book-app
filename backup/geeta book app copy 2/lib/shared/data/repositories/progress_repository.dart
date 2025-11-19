import 'package:hive/hive.dart';
import 'package:dio/dio.dart';
import '../../../core/config/app_config.dart';
import '../../domain/models/user_progress.dart';

class ProgressRepository {
  final Dio _dio = Dio(BaseOptions(
    baseUrl: AppConfig.apiBaseUrl,
  ));

  Future<UserProgress> getUserProgress() async {
    try {
      // Try to get from local storage first
      final box = await Hive.openBox('progress');
      final data = box.get('userProgress');
      
      if (data != null) {
        return UserProgress.fromJson(Map<String, dynamic>.from(data));
      }
      
      // If not in local storage, fetch from API
      final response = await _dio.get(AppConfig.progressEndpoint);
      final progress = UserProgress.fromJson(response.data);
      
      // Cache it locally
      await box.put('userProgress', progress.toJson());
      return progress;
    } catch (e) {
      // Return default progress
      return const UserProgress(
        userId: 'default',
        totalChaptersCompleted: 0,
        totalVersesCompleted: 0,
        totalActivitiesCompleted: 0,
      );
    }
  }

  Future<void> markVerseComplete(String verseId) async {
    try {
      await _dio.post(
        '${AppConfig.progressEndpoint}/verse/$verseId/complete',
      );
      
      // Update local cache
      final box = await Hive.openBox('progress');
      final data = box.get('userProgress');
      if (data != null) {
        final progress = UserProgress.fromJson(Map<String, dynamic>.from(data));
        final updatedProgress = progress.copyWith(
          totalVersesCompleted: progress.totalVersesCompleted + 1,
        );
        await box.put('userProgress', updatedProgress.toJson());
      }
    } catch (e) {
      // Handle error
      print('Error marking verse complete: $e');
    }
  }

  Future<void> markActivityComplete(String activityId) async {
    try {
      await _dio.post(
        '${AppConfig.progressEndpoint}/activity/$activityId/complete',
      );
      
      // Update local cache
      final box = await Hive.openBox('progress');
      final data = box.get('userProgress');
      if (data != null) {
        final progress = UserProgress.fromJson(Map<String, dynamic>.from(data));
        final updatedProgress = progress.copyWith(
          totalActivitiesCompleted: progress.totalActivitiesCompleted + 1,
        );
        await box.put('userProgress', updatedProgress.toJson());
      }
    } catch (e) {
      print('Error marking activity complete: $e');
    }
  }

  Future<void> markChapterComplete(String chapterId) async {
    try {
      await _dio.post(
        '${AppConfig.progressEndpoint}/chapter/$chapterId/complete',
      );
      
      // Update local cache
      final box = await Hive.openBox('progress');
      final data = box.get('userProgress');
      if (data != null) {
        final progress = UserProgress.fromJson(Map<String, dynamic>.from(data));
        final updatedProgress = progress.copyWith(
          totalChaptersCompleted: progress.totalChaptersCompleted + 1,
        );
        await box.put('userProgress', updatedProgress.toJson());
      }
    } catch (e) {
      print('Error marking chapter complete: $e');
    }
  }
}
