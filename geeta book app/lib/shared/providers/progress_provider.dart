import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../domain/models/user_progress.dart';
import '../data/repositories/progress_repository.dart';

// Progress Repository Provider
final progressRepositoryProvider = Provider<ProgressRepository>((ref) {
  return ProgressRepository();
});

// User Progress Provider
final progressProvider = StateNotifierProvider<ProgressNotifier, UserProgress>((ref) {
  final repository = ref.watch(progressRepositoryProvider);
  return ProgressNotifier(repository);
});

class ProgressNotifier extends StateNotifier<UserProgress> {
  final ProgressRepository _repository;

  ProgressNotifier(this._repository)
      : super(const UserProgress(
          userId: 'default',
          totalChaptersCompleted: 0,
          totalVersesCompleted: 0,
          totalActivitiesCompleted: 0,
        )) {
    _loadProgress();
  }

  Future<void> _loadProgress() async {
    final progress = await _repository.getUserProgress();
    state = progress;
  }

  Future<void> markVerseComplete(String verseId) async {
    await _repository.markVerseComplete(verseId);
    await _loadProgress();
  }

  Future<void> markActivityComplete(String activityId) async {
    await _repository.markActivityComplete(activityId);
    await _loadProgress();
  }

  Future<void> markChapterComplete(String chapterId) async {
    await _repository.markChapterComplete(chapterId);
    await _loadProgress();
  }
}
