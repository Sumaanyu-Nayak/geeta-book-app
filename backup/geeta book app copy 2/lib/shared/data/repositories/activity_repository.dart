import 'package:dio/dio.dart';
import '../../../core/config/app_config.dart';
import '../../domain/models/activity.dart';

class ActivityRepository {
  final Dio _dio = Dio(BaseOptions(
    baseUrl: AppConfig.apiBaseUrl,
  ));

  Future<List<Activity>> getActivitiesByChapter(String chapterId) async {
    try {
      final response = await _dio.get(
        '${AppConfig.activitiesEndpoint}/chapter/$chapterId',
      );
      final List<dynamic> data = response.data;
      return data.map((json) => Activity.fromJson(json)).toList();
    } catch (e) {
      return _getMockActivities(chapterId);
    }
  }

  List<Activity> _getMockActivities(String chapterId) {
    return [
      Activity(
        id: '$chapterId-watch',
        chapterId: chapterId,
        title: 'Watch Verse Explanations',
        description: 'Watch detailed video explanations for each verse with Sanskrit recitation and English translation.',
        type: ActivityType.watch,
        iconUrl: 'video_icon',
      ),
      Activity(
        id: '$chapterId-read',
        chapterId: chapterId,
        title: 'Read All Verses',
        description: 'Read all verses of this chapter with transliteration and translation.',
        type: ActivityType.read,
        iconUrl: 'book_icon',
      ),
      Activity(
        id: '$chapterId-listen',
        chapterId: chapterId,
        title: 'Listen to Audio',
        description: 'Listen to Sanskrit recitation of all verses with soothing background music.',
        type: ActivityType.listen,
        iconUrl: 'audio_icon',
      ),
      Activity(
        id: '$chapterId-quiz',
        chapterId: chapterId,
        title: 'Take Chapter Quiz',
        description: 'Test your understanding with an interactive quiz covering key concepts.',
        type: ActivityType.quiz,
        iconUrl: 'quiz_icon',
      ),
      Activity(
        id: '$chapterId-reflection',
        chapterId: chapterId,
        title: 'Write Reflection',
        description: 'Reflect on the teachings and write your personal insights and learnings.',
        type: ActivityType.reflection,
        iconUrl: 'write_icon',
      ),
      Activity(
        id: '$chapterId-discussion',
        chapterId: chapterId,
        title: 'Join Discussion',
        description: 'Engage with the community and discuss interpretations and applications.',
        type: ActivityType.discussion,
        iconUrl: 'discuss_icon',
      ),
    ];
  }
}
