import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../domain/models/activity.dart';
import '../data/repositories/activity_repository.dart';

// Activity Repository Provider
final activityRepositoryProvider = Provider<ActivityRepository>((ref) {
  return ActivityRepository();
});

// Activities by Chapter Provider
final activitiesProvider = FutureProvider.family<List<Activity>, String>((ref, chapterId) async {
  final repository = ref.watch(activityRepositoryProvider);
  return repository.getActivitiesByChapter(chapterId);
});
