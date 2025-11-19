import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:video_player/video_player.dart';
import 'package:chewie/chewie.dart';
import 'package:animate_do/animate_do.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/theme/app_theme.dart';
import '../../../../shared/providers/verses_provider.dart';
import '../../../../shared/providers/progress_provider.dart';

class VerseDetailPage extends ConsumerStatefulWidget {
  final String chapterId;
  final String verseId;

  const VerseDetailPage({
    super.key,
    required this.chapterId,
    required this.verseId,
  });

  @override
  ConsumerState<VerseDetailPage> createState() => _VerseDetailPageState();
}

class _VerseDetailPageState extends ConsumerState<VerseDetailPage> {
  VideoPlayerController? _videoPlayerController;
  ChewieController? _chewieController;

  @override
  void dispose() {
    _videoPlayerController?.dispose();
    _chewieController?.dispose();
    super.dispose();
  }

  Future<void> _initializeVideo(String videoUrl) async {
    _videoPlayerController = VideoPlayerController.networkUrl(Uri.parse(videoUrl));
    await _videoPlayerController!.initialize();
    
    _chewieController = ChewieController(
      videoPlayerController: _videoPlayerController!,
      autoPlay: false,
      looping: false,
      aspectRatio: 16 / 9,
      errorBuilder: (context, errorMessage) {
        return Center(
          child: Text(
            errorMessage,
            style: const TextStyle(color: Colors.white),
          ),
        );
      },
    );
    
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    final verseAsync = ref.watch(verseProvider(widget.verseId));

    return Scaffold(
      body: verseAsync.when(
        data: (verse) {
          if (_chewieController == null && verse.videoUrl != null) {
            _initializeVideo(verse.videoUrl!);
          }

          return CustomScrollView(
            slivers: [
              // App Bar
              SliverAppBar(
                pinned: true,
                title: Text('Chapter ${widget.chapterId} - Verse ${verse.verseNumber}'),
              ),

              SliverToBoxAdapter(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Video Player Section
                    if (_chewieController != null)
                      FadeIn(
                        child: Container(
                          width: double.infinity,
                          height: 250,
                          color: Colors.black,
                          child: Chewie(controller: _chewieController!),
                        ),
                      )
                    else
                      Container(
                        width: double.infinity,
                        height: 250,
                        color: Colors.black,
                        child: const Center(
                          child: CircularProgressIndicator(),
                        ),
                      ),

                    // Explanation Section
                    FadeInUp(
                      delay: const Duration(milliseconds: 100),
                      child: Padding(
                        padding: const EdgeInsets.all(16),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Explanation',
                              style: Theme.of(context).textTheme.headlineMedium,
                            ),
                            const SizedBox(height: 12),
                            Text(
                              verse.explanation,
                              style: Theme.of(context).textTheme.bodyLarge,
                            ),
                          ],
                        ),
                      ),
                    ),

                    // Verse Images Carousel
                    if (verse.images.isNotEmpty)
                      FadeInUp(
                        delay: const Duration(milliseconds: 150),
                        child: SizedBox(
                          height: 200,
                          child: ListView.builder(
                            scrollDirection: Axis.horizontal,
                            padding: const EdgeInsets.symmetric(horizontal: 16),
                            itemCount: verse.images.length,
                            itemBuilder: (context, index) {
                              return Padding(
                                padding: const EdgeInsets.only(right: 12),
                                child: ClipRRect(
                                  borderRadius: BorderRadius.circular(12),
                                  child: Image.network(
                                    verse.images[index],
                                    width: 200,
                                    height: 200,
                                    fit: BoxFit.cover,
                                  ),
                                ),
                              );
                            },
                          ),
                        ),
                      ),

                    const SizedBox(height: 24),

                    // Verse Section
                    // Sanskrit Text Section
                    FadeInUp(
                      delay: const Duration(milliseconds: 200),
                      child: Container(
                        width: double.infinity,
                        padding: const EdgeInsets.all(16),
                        margin: const EdgeInsets.symmetric(horizontal: 16),
                        decoration: BoxDecoration(
                          gradient: AppTheme.accentGradient,
                          borderRadius: BorderRadius.circular(16),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Verse',
                              style: Theme.of(context)
                                  .textTheme
                                  .titleLarge
                                  ?.copyWith(color: Colors.white),
                            ),
                            const SizedBox(height: 16),
                            
                            // Sanskrit Text
                            Text(
                              verse.textSanskrit,
                              style: Theme.of(context)
                                  .textTheme
                                  .titleMedium
                                  ?.copyWith(
                                    color: Colors.white,
                                    fontStyle: FontStyle.italic,
                                  ),
                            ),
                            const SizedBox(height: 12),
                            
                            // Transliteration
                            Text(
                              verse.textTransliteration,
                              style: Theme.of(context)
                                  .textTheme
                                  .bodyLarge
                                  ?.copyWith(color: Colors.white70),
                            ),
                            const SizedBox(height: 16),
                            
                            const Divider(color: Colors.white30),
                            const SizedBox(height: 16),
                            
                            // English Translation
                            Text(
                              'Translation',
                              style: Theme.of(context)
                                  .textTheme
                                  .titleMedium
                                  ?.copyWith(color: Colors.white),
                            ),
                            const SizedBox(height: 8),
                            Text(
                              verse.translationEnglish,
                              style: Theme.of(context)
                                  .textTheme
                                  .bodyMedium
                                  ?.copyWith(color: Colors.white),
                            ),
                          ],
                        ),
                      ),
                    ),

                    const SizedBox(height: 24),

                    // Activities/Experiments Button
                    FadeInUp(
                      delay: const Duration(milliseconds: 250),
                      child: Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 16),
                        child: SizedBox(
                          width: double.infinity,
                          child: OutlinedButton.icon(
                            onPressed: () {
                              context.push(
                                '/chapter/${widget.chapterId}/verse/${verse.verseNumber}/activities',
                              );
                            },
                            icon: const Icon(Icons.science),
                            label: const Text('View Activities & Experiments'),
                            style: OutlinedButton.styleFrom(
                              padding: const EdgeInsets.symmetric(vertical: 16),
                              side: BorderSide(
                                color: Theme.of(context).colorScheme.primary,
                                width: 2,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),

                    const SizedBox(height: 16),

                    // Mark as Complete Button
                    FadeInUp(
                      delay: const Duration(milliseconds: 300),
                      child: Padding(
                        padding: const EdgeInsets.all(16),
                        child: SizedBox(
                          width: double.infinity,
                          child: ElevatedButton(
                            onPressed: verse.isCompleted
                                ? null
                                : () {
                                    ref
                                        .read(progressProvider.notifier)
                                        .markVerseComplete(widget.verseId);
                                  },
                            style: ElevatedButton.styleFrom(
                              padding: const EdgeInsets.symmetric(vertical: 16),
                              backgroundColor: verse.isCompleted
                                  ? Colors.grey
                                  : AppTheme.primaryOrange,
                            ),
                            child: Text(
                              verse.isCompleted
                                  ? 'Completed ✓'
                                  : 'Mark as Complete',
                              style: const TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          );
        },
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (error, stack) => Center(
          child: Text('Error loading verse: $error'),
        ),
      ),
    );
  }
}
