import 'package:freezed_annotation/freezed_annotation.dart';

part 'user_progress.freezed.dart';
part 'user_progress.g.dart';

@freezed
class UserProgress with _$UserProgress {
  const factory UserProgress({
    required String userId,
    required int totalChaptersCompleted,
    required int totalVersesCompleted,
    required int totalActivitiesCompleted,
    @Default({}) Map<String, ChapterProgress> chapterProgress,
    DateTime? lastUpdated,
  }) = _UserProgress;

  factory UserProgress.fromJson(Map<String, dynamic> json) =>
      _$UserProgressFromJson(json);
}

@freezed
class ChapterProgress with _$ChapterProgress {
  const factory ChapterProgress({
    required String chapterId,
    required int versesCompleted,
    required int totalVerses,
    required int activitiesCompleted,
    required int totalActivities,
    @Default(false) bool isCompleted,
    DateTime? completedAt,
  }) = _ChapterProgress;

  factory ChapterProgress.fromJson(Map<String, dynamic> json) =>
      _$ChapterProgressFromJson(json);
}
