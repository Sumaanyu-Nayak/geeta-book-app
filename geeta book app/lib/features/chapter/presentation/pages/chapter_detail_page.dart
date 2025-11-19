import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:animate_do/animate_do.dart';
import '../../../../core/theme/app_theme.dart';
import '../../../../core/widgets/activity_card.dart';
import '../../../../shared/providers/activities_provider.dart';
import '../../../../shared/providers/chapters_provider.dart';

class ChapterDetailPage extends ConsumerWidget {
  final String chapterId;

  const ChapterDetailPage({
    super.key,
    required this.chapterId,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final chapterAsync = ref.watch(chapterProvider(chapterId));
    final activitiesAsync = ref.watch(activitiesProvider(chapterId));

    print('=== CHAPTER DETAIL PAGE ===');
    print('Chapter ID: $chapterId');
    print('Chapter async state: ${chapterAsync.runtimeType}');

    return Scaffold(
      body: chapterAsync.when(
        data: (chapter) {
          print('✅ Chapter loaded successfully: ${chapter.titleEnglish}');
          return CustomScrollView(
            slivers: [
            // App Bar with Chapter Info
            SliverAppBar(
              expandedHeight: 250,
              floating: false,
              pinned: true,
              flexibleSpace: FlexibleSpaceBar(
                title: Text(
                  chapter.titleEnglish,
                  style: const TextStyle(
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
                background: Stack(
                  fit: StackFit.expand,
                  children: [
                    // Chapter Image
                    Image.network(
                      chapter.imageUrl,
                      fit: BoxFit.cover,
                      errorBuilder: (context, error, stackTrace) {
                        return Container(
                          decoration: const BoxDecoration(
                            gradient: AppTheme.accentGradient,
                          ),
                        );
                      },
                    ),
                    // Gradient Overlay
                    Container(
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          begin: Alignment.topCenter,
                          end: Alignment.bottomCenter,
                          colors: [
                            Colors.transparent,
                            Colors.black.withOpacity(0.7),
                          ],
                        ),
                      ),
                    ),
                    // Chapter Info
                    Positioned(
                      bottom: 60,
                      left: 16,
                      right: 16,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 12,
                              vertical: 6,
                            ),
                            decoration: BoxDecoration(
                              color: AppTheme.primaryOrange,
                              borderRadius: BorderRadius.circular(20),
                            ),
                            child: Text(
                              'Chapter ${chapter.number}',
                              style: const TextStyle(
                                color: Colors.white,
                                fontWeight: FontWeight.w600,
                                fontSize: 12,
                              ),
                            ),
                          ),
                          const SizedBox(height: 8),
                          Text(
                            chapter.titleSanskrit,
                            style: const TextStyle(
                              color: Colors.white70,
                              fontSize: 16,
                              fontStyle: FontStyle.italic,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),

            // Chapter Description
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: FadeInUp(
                  child: Card(
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'About this Chapter',
                            style: Theme.of(context).textTheme.titleLarge,
                          ),
                          const SizedBox(height: 12),
                          Text(
                            chapter.description,
                            style: Theme.of(context).textTheme.bodyMedium,
                          ),
                          const SizedBox(height: 16),
                          Row(
                            children: [
                              _buildInfoChip(
                                context,
                                Icons.format_list_numbered,
                                '${chapter.verseCount} Verses',
                              ),
                              const SizedBox(width: 12),
                              _buildInfoChip(
                                context,
                                Icons.check_circle,
                                '${chapter.completedActivities}/${chapter.totalActivities} Done',
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ),

            // Activities Section
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: Text(
                  'Activities',
                  style: Theme.of(context).textTheme.titleLarge,
                ),
              ),
            ),

            // Activities Grid
            activitiesAsync.when(
              data: (activities) => SliverPadding(
                padding: const EdgeInsets.all(16),
                sliver: SliverList(
                  delegate: SliverChildBuilderDelegate(
                    (context, index) {
                      final activity = activities[index];
                      return FadeInUp(
                        delay: Duration(milliseconds: 40 * index),
                        child: Padding(
                          padding: const EdgeInsets.only(bottom: 16),
                          child: ActivityCard(
                            activity: activity,
                            chapterId: chapterId,
                          ),
                        ),
                      );
                    },
                    childCount: activities.length,
                  ),
                ),
              ),
              loading: () => const SliverToBoxAdapter(
                child: Center(
                  child: Padding(
                    padding: EdgeInsets.all(32),
                    child: CircularProgressIndicator(),
                  ),
                ),
              ),
              error: (error, stack) => SliverToBoxAdapter(
                child: Center(
                  child: Padding(
                    padding: const EdgeInsets.all(32),
                    child: Text('Error loading activities: $error'),
                  ),
                ),
              ),
            ),
          ],
        );
        },
        loading: () {
          print('⏳ Chapter loading...');
          return const Center(child: CircularProgressIndicator());
        },
        error: (error, stack) {
          print('❌ ERROR loading chapter: $error');
          print('Stack trace: $stack');
          return Center(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Icon(Icons.error, size: 48, color: Colors.red),
                  const SizedBox(height: 16),
                  Text(
                    'Error loading chapter',
                    style: Theme.of(context).textTheme.titleLarge,
                  ),
                  const SizedBox(height: 8),
                  Text(
                    '$error',
                    textAlign: TextAlign.center,
                    style: Theme.of(context).textTheme.bodyMedium,
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildInfoChip(BuildContext context, IconData icon, String label) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: AppTheme.primaryOrange.withOpacity(0.1),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 16, color: AppTheme.primaryOrange),
          const SizedBox(width: 6),
          Text(
            label,
            style: Theme.of(context).textTheme.bodySmall?.copyWith(
                  color: AppTheme.primaryOrange,
                  fontWeight: FontWeight.w600,
                ),
          ),
        ],
      ),
    );
  }
}
