import 'package:dio/dio.dart';
import '../../../core/config/app_config.dart';
import '../../domain/models/chapter.dart';

class ChapterRepository {
  final Dio _dio = Dio(BaseOptions(
    baseUrl: AppConfig.apiBaseUrl,
  ));

  Future<List<Chapter>> getAllChapters() async {
    try {
      final response = await _dio.get(AppConfig.chaptersEndpoint);
      final List<dynamic> data = response.data;
      return data.map((json) => Chapter.fromJson(json)).toList();
    } catch (e) {
      // For now, return mock data
      return _getMockChapters();
    }
  }

  Future<Chapter> getChapterById(String id) async {
    try {
      print('Fetching chapter with ID: $id');
      final response = await _dio.get('${AppConfig.chaptersEndpoint}/$id');
      return Chapter.fromJson(response.data);
    } catch (e) {
      print('API error for chapter $id, using mock data: $e');
      // Return mock data
      final chapters = _getMockChapters();
      print('Available chapters: ${chapters.map((c) => 'id:${c.id}, number:${c.number}').toList()}');
      print('Looking for chapter with ID: $id');
      // Handle both string and number comparisons
      final chapter = chapters.firstWhere(
        (c) => c.id == id || c.number.toString() == id,
        orElse: () {
          print('Chapter not found, returning first chapter');
          return chapters.first;
        },
      );
      print('Found chapter: ${chapter.titleEnglish}');
      return chapter;
    }
  }

  List<Chapter> _getMockChapters() {
    return List.generate(18, (index) {
      final number = index + 1;
      return Chapter(
        id: number.toString(),
        number: number,
        titleSanskrit: _getSanskritTitle(number),
        titleEnglish: _getEnglishTitle(number),
        titleHindi: _getHindiTitle(number),
        description: _getDescription(number),
        verseCount: _getVerseCount(number),
        imageUrl: 'https://picsum.photos/seed/chapter$number/400/300',
        keyThemes: _getKeyThemes(number),
        totalActivities: 6,
        completedActivities: 0,
      );
    });
  }

  String _getSanskritTitle(int number) {
    final titles = [
      'अर्जुनविषादयोग',
      'सांख्ययोग',
      'कर्मयोग',
      'ज्ञानकर्मसंन्यासयोग',
      'कर्मसंन्यासयोग',
      'आत्मसंयमयोग',
      'ज्ञानविज्ञानयोग',
      'अक्षरब्रह्मयोग',
      'राजविद्याराजगुह्ययोग',
      'विभूतियोग',
      'विश्वरूपदर्शनयोग',
      'भक्तियोग',
      'क्षेत्रक्षेत्रज्ञविभागयोग',
      'गुणत्रयविभागयोग',
      'पुरुषोत्तमयोग',
      'दैवासुरसंपद्विभागयोग',
      'श्रद्धात्रयविभागयोग',
      'मोक्षसंन्यासयोग',
    ];
    return titles[number - 1];
  }

  String _getEnglishTitle(int number) {
    final titles = [
      'The Yoga of Arjuna\'s Dejection',
      'The Yoga of Knowledge',
      'The Yoga of Action',
      'The Yoga of Wisdom and Action',
      'The Yoga of Renunciation',
      'The Yoga of Meditation',
      'The Yoga of Knowledge and Wisdom',
      'The Yoga of the Imperishable Brahman',
      'The Yoga of Royal Knowledge',
      'The Yoga of Divine Manifestations',
      'The Yoga of the Vision of the Universal Form',
      'The Yoga of Devotion',
      'The Yoga of the Field and Its Knower',
      'The Yoga of the Three Gunas',
      'The Yoga of the Supreme Person',
      'The Yoga of the Divine and Demonic Natures',
      'The Yoga of the Three Types of Faith',
      'The Yoga of Liberation through Renunciation',
    ];
    return titles[number - 1];
  }

  String _getHindiTitle(int number) {
    final titles = [
      'अर्जुन विषाद योग',
      'सांख्य योग',
      'कर्म योग',
      'ज्ञान कर्म संन्यास योग',
      'कर्म संन्यास योग',
      'आत्म संयम योग',
      'ज्ञान विज्ञान योग',
      'अक्षर ब्रह्म योग',
      'राजविद्या राजगुह्य योग',
      'विभूति योग',
      'विश्वरूप दर्शन योग',
      'भक्ति योग',
      'क्षेत्र क्षेत्रज्ञ विभाग योग',
      'गुणत्रय विभाग योग',
      'पुरुषोत्तम योग',
      'दैवासुर संपद् विभाग योग',
      'श्रद्धात्रय विभाग योग',
      'मोक्ष संन्यास योग',
    ];
    return titles[number - 1];
  }

  String _getDescription(int number) {
    return 'This chapter explores the profound teachings of the Bhagavad Geeta, providing timeless wisdom for modern life. Learn about dharma, karma, and the path to spiritual enlightenment.';
  }

  int _getVerseCount(int number) {
    final counts = [47, 72, 43, 42, 29, 47, 30, 28, 34, 42, 55, 20, 35, 27, 20, 24, 28, 78];
    return counts[number - 1];
  }

  List<String> _getKeyThemes(int number) {
    return ['Wisdom', 'Action', 'Devotion', 'Knowledge'];
  }
}
