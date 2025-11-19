import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../domain/models/verse.dart';
import '../data/repositories/verse_repository.dart';

// Verse Repository Provider
final verseRepositoryProvider = Provider<VerseRepository>((ref) {
  return VerseRepository();
});

// Verses by Chapter Provider
final versesProvider = FutureProvider.family<List<Verse>, String>((ref, chapterId) async {
  final repository = ref.watch(verseRepositoryProvider);
  return repository.getVersesByChapter(chapterId);
});

// Single Verse Provider
final verseProvider = FutureProvider.family<Verse, String>((ref, verseId) async {
  final repository = ref.watch(verseRepositoryProvider);
  return repository.getVerseById(verseId);
});
