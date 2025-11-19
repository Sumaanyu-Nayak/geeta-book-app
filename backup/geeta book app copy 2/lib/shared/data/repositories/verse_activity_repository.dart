import 'package:dio/dio.dart';
import '../../../shared/domain/models/verse_activity.dart';

class VerseActivityRepository {
  final Dio _dio;

  VerseActivityRepository(this._dio);

  /// Get all verse activities
  Future<List<VerseActivity>> getAllActivities() async {
    try {
      final response = await _dio.get('/verse-activities');
      final List<dynamic> data = response.data;
      return data.map((json) => VerseActivity.fromJson(json)).toList();
    } catch (e) {
      throw Exception('Failed to load verse activities: $e');
    }
  }

  /// Get verse activities by chapter
  Future<List<VerseActivity>> getActivitiesByChapter(String chapterId) async {
    try {
      final response = await _dio.get('/verse-activities/chapter/$chapterId');
      final List<dynamic> data = response.data;
      return data.map((json) => VerseActivity.fromJson(json)).toList();
    } catch (e) {
      throw Exception('Failed to load activities for chapter $chapterId: $e');
    }
  }

  /// Get verse activities for a specific verse
  Future<List<VerseActivity>> getActivitiesByVerse({
    required String chapterId,
    required int verseNumber,
  }) async {
    try {
      final response = await _dio.get(
        '/verse-activities/chapter/$chapterId/verse/$verseNumber',
      );
      final List<dynamic> data = response.data;
      return data.map((json) => VerseActivity.fromJson(json)).toList();
    } catch (e) {
      throw Exception(
        'Failed to load activities for verse $chapterId-$verseNumber: $e',
      );
    }
  }

  /// Get a single verse activity by ID
  Future<VerseActivity> getActivityById(String activityId) async {
    try {
      final response = await _dio.get('/verse-activities/$activityId');
      return VerseActivity.fromJson(response.data);
    } catch (e) {
      throw Exception('Failed to load activity $activityId: $e');
    }
  }
}
