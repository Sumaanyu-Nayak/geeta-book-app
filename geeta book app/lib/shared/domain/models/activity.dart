import 'package:freezed_annotation/freezed_annotation.dart';

part 'activity.freezed.dart';
part 'activity.g.dart';

enum ActivityType {
  read,
  watch,
  experiments,
  listen,
  quiz,
  reflection,
  discussion,
  dailyVerse,
}

@freezed
class Activity with _$Activity {
  const factory Activity({
    required String id,
    required String chapterId,
    required String title,
    required String description,
    required ActivityType type,
    required String iconUrl,
    @Default(false) bool isCompleted,
    int? completionPercentage,
    DateTime? lastAccessed,
  }) = _Activity;

  factory Activity.fromJson(Map<String, dynamic> json) =>
      _$ActivityFromJson(json);
}
