import 'package:freezed_annotation/freezed_annotation.dart';

part 'verse.freezed.dart';
part 'verse.g.dart';

@freezed
class Verse with _$Verse {
  const factory Verse({
    required String id,
    required String chapterId,
    required int verseNumber,
    required String textSanskrit,
    required String textTransliteration,
    required String translationEnglish,
    required String translationHindi,
    required String explanation,
    String? videoUrl,
    String? audioUrl,
    @Default([]) List<String> images,
    @Default(false) bool isCompleted,
    DateTime? completedAt,
  }) = _Verse;

  factory Verse.fromJson(Map<String, dynamic> json) =>
      _$VerseFromJson(json);
}
