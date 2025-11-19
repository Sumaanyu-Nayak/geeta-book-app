import 'package:freezed_annotation/freezed_annotation.dart';

part 'verse_activity.freezed.dart';
part 'verse_activity.g.dart';

enum VerseActivityType {
  experiment,
  meditation,
  reflection,
  practice,
  journaling,
  @JsonValue('daily_challenge')
  dailyChallenge,
}

enum ActivityDifficulty {
  beginner,
  intermediate,
  advanced,
}

@freezed
class ActivityInstruction with _$ActivityInstruction {
  const factory ActivityInstruction({
    required int step,
    required String description,
  }) = _ActivityInstruction;

  factory ActivityInstruction.fromJson(Map<String, dynamic> json) =>
      _$ActivityInstructionFromJson(json);
}

@freezed
class VerseActivity with _$VerseActivity {
  const factory VerseActivity({
    required String id,
    required String chapterId,
    required int verseNumber,
    required String title,
    required String description,
    required VerseActivityType type,
    required List<ActivityInstruction> instructions,
    required String duration,
    required ActivityDifficulty difficulty,
    required List<String> benefits,
    String? iconUrl,
    required int order,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) = _VerseActivity;

  factory VerseActivity.fromJson(Map<String, dynamic> json) =>
      _$VerseActivityFromJson(json);
}
