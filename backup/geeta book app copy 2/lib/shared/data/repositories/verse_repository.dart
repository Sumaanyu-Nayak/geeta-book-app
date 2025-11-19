import 'package:dio/dio.dart';
import '../../../core/config/app_config.dart';
import '../../domain/models/verse.dart';

class VerseRepository {
  final Dio _dio = Dio(BaseOptions(
    baseUrl: AppConfig.apiBaseUrl,
  ));

  Future<List<Verse>> getVersesByChapter(String chapterId) async {
    try {
      final response = await _dio.get(
        '${AppConfig.versesEndpoint}/chapter/$chapterId',
      );
      final List<dynamic> data = response.data;
      return data.map((json) => Verse.fromJson(json)).toList();
    } catch (e) {
      return _getMockVerses(chapterId);
    }
  }

  Future<Verse> getVerseById(String verseId) async {
    try {
      final response = await _dio.get('${AppConfig.versesEndpoint}/$verseId');
      return Verse.fromJson(response.data);
    } catch (e) {
      return _getMockVerse(verseId);
    }
  }

  List<Verse> _getMockVerses(String chapterId) {
    return List.generate(10, (index) {
      final verseNumber = index + 1;
      return Verse(
        id: '$chapterId-$verseNumber',
        chapterId: chapterId,
        verseNumber: verseNumber,
        textSanskrit: 'युक्ताहारविहारस्य युक्तचेष्टस्य कर्मसु। युक्तस्वप्नावबोधस्य योगो भवति दुःखहा॥',
        textTransliteration:
            'yuktāhāra-vihārasya yukta-cheṣhṭasya karmasu\nyukta-svapnāvabodhasya yogo bhavati duḥkha-hā',
        translationEnglish:
            'Those who are temperate in eating and recreation, balanced in work, and regulated in sleep, can mitigate all sorrows by practicing Yoga.',
        translationHindi:
            'जो व्यक्ति खाने-पीने, विहार करने, कर्म करने तथा सोने-जागने में संयम रखते हैं, उनका योग दुःखों का नाश करने वाला होता है।',
        explanation:
            'This verse emphasizes the importance of balance and moderation in all aspects of life. Krishna teaches that yoga is not just about meditation, but about maintaining equilibrium in daily activities including food, sleep, work, and recreation. By practicing moderation, one can reduce suffering and achieve mental peace.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        images: [],
      );
    });
  }

  Verse _getMockVerse(String verseId) {
    return Verse(
      id: verseId,
      chapterId: verseId.split('-').first,
      verseNumber: int.parse(verseId.split('-').last),
      textSanskrit:
          'युक्ताहारविहारस्य युक्तचेष्टस्य कर्मसु। युक्तस्वप्नावबोधस्य योगो भवति दुःखहा॥ ||17||',
      textTransliteration:
          'yuktāhāra-vihārasya yukta-cheṣhṭasya karmasu\nyukta-svapnāvabodhasya yogo bhavati duḥkha-hā',
      translationEnglish:
          'Those who are temperate in eating and recreation, balanced in work, and regulated in sleep, can mitigate all sorrows by practicing Yoga.',
      translationHindi:
          'जो व्यक्ति खाने-पीने, विहार करने, कर्म करने तथा सोने-जागने में संयम रखते हैं, उनका योग दुःखों का नाश करने वाला होता है।',
      explanation:
          'This verse emphasizes the importance of balance and moderation in all aspects of life. Krishna teaches that yoga is not just about meditation, but about maintaining equilibrium in daily activities including food, sleep, work, and recreation. By practicing moderation, one can reduce suffering and achieve mental peace.\n\nThe key message here is that spiritual progress doesn\'t require extreme austerities or complete withdrawal from worldly life. Instead, it requires a balanced approach where one engages with the world mindfully and with moderation. This makes the teachings of the Geeta practical and applicable to modern life.',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      images: [
        'https://picsum.photos/seed/verse1/400/300',
        'https://picsum.photos/seed/verse2/400/300',
      ],
    );
  }
}
