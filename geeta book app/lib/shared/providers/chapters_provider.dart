import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../domain/models/chapter.dart';
import '../data/repositories/chapter_repository.dart';

// Chapter Repository Provider
final chapterRepositoryProvider = Provider<ChapterRepository>((ref) {
  return ChapterRepository();
});

// All Chapters Provider
final chaptersProvider = FutureProvider<List<Chapter>>((ref) async {
  final repository = ref.watch(chapterRepositoryProvider);
  return repository.getAllChapters();
});

// Single Chapter Provider
final chapterProvider = FutureProvider.family<Chapter, String>((ref, id) async {
  final repository = ref.watch(chapterRepositoryProvider);
  return repository.getChapterById(id);
});
