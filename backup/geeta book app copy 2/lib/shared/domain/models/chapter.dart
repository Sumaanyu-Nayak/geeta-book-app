import 'package:freezed_annotation/freezed_annotation.dart';

part 'chapter.freezed.dart';
part 'chapter.g.dart';

@freezed
class Chapter with _$Chapter {
  const factory Chapter({
    required String id,
    required int number,
    required String titleSanskrit,
    required String titleEnglish,
    required String titleHindi,
    required String description,
    required int verseCount,
    required String imageUrl,
    String? videoUrl,
    @Default([]) List<String> keyThemes,
    @Default(false) bool isCompleted,
    @Default(0) int completedActivities,
    @Default(0) int totalActivities,
  }) = _Chapter;

  factory Chapter.fromJson(Map<String, dynamic> json) =>
      _$ChapterFromJson(json);
}
