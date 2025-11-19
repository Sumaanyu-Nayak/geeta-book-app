# Verse Activities API Documentation

## Overview
The Verse Activities API provides detailed practical activities, experiments, meditations, and reflections for each verse of the Bhagavad Geeta. This allows users to apply the teachings in their daily lives through structured exercises.

## Database Schema

### VerseActivity Model
```javascript
{
  chapterId: String,          // e.g., "1", "2"
  verseNumber: Number,        // e.g., 1, 2, 3
  title: String,              // e.g., "Practice Detachment - Verse 1"
  description: String,        // Brief description of the activity
  type: String,               // enum: experiment, meditation, reflection, practice, journaling, daily_challenge
  instructions: [{
    step: Number,             // Sequential step number
    description: String       // Detailed instruction for this step
  }],
  duration: String,           // e.g., "15 minutes", "30 minutes", "Full day"
  difficulty: String,         // enum: beginner, intermediate, advanced
  benefits: [String],         // Array of benefits, e.g., ["Reduced anxiety", "Inner peace"]
  iconUrl: String,           // Icon identifier for the activity type
  order: Number,             // Order of activity for the verse (0, 1, 2...)
  id: String                 // Composite ID: "{chapterId}-{verseNumber}-{order}"
}
```

## API Endpoints

### 1. Get All Verse Activities
```
GET /api/verse-activities
```
Returns all verse activities across all chapters.

**Response**: Array of VerseActivity objects

---

### 2. Get Activities by Chapter
```
GET /api/verse-activities/chapter/:chapterId
```
Returns all activities for a specific chapter.

**Example**: `GET /api/verse-activities/chapter/1`

**Response**: Array of VerseActivity objects for Chapter 1

---

### 3. Get Activities for Specific Verse
```
GET /api/verse-activities/chapter/:chapterId/verse/:verseNumber
```
Returns all activities for a specific verse (recommended endpoint).

**Example**: `GET /api/verse-activities/chapter/1/verse/1`

**Response**: Array of VerseActivity objects for Chapter 1, Verse 1

**Sample Response**:
```json
[
  {
    "id": "1-1-0",
    "chapterId": "1",
    "verseNumber": 1,
    "title": "Practice Detachment - Verse 1",
    "description": "Apply the teaching of non-attachment by consciously letting go of expectations in a specific situation today.",
    "type": "experiment",
    "instructions": [
      {
        "step": 1,
        "description": "Choose a task or interaction where you typically have strong expectations."
      },
      {
        "step": 2,
        "description": "Before starting, consciously acknowledge your attachment to specific outcomes."
      }
      // ... more steps
    ],
    "duration": "30 minutes",
    "difficulty": "intermediate",
    "benefits": [
      "Reduced anxiety about outcomes",
      "Greater inner peace",
      "Improved focus on the present"
    ],
    "iconUrl": "experiment_icon",
    "order": 0
  }
  // ... more activities
]
```

---

### 4. Get Single Activity by ID
```
GET /api/verse-activities/:activityId
```
Returns a specific activity by its composite ID.

**Example**: `GET /api/verse-activities/1-1-0`

**Response**: Single VerseActivity object

---

### 5. Create Activity (Admin)
```
POST /api/verse-activities
```
Creates a new verse activity.

**Request Body**: VerseActivity object (without id)

---

### 6. Update Activity (Admin)
```
PUT /api/verse-activities/:activityId
```
Updates an existing activity.

**Example**: `PUT /api/verse-activities/1-1-0`

**Request Body**: Partial VerseActivity object with fields to update

---

### 7. Delete Activity (Admin)
```
DELETE /api/verse-activities/:activityId
```
Deletes a verse activity.

**Example**: `DELETE /api/verse-activities/1-1-0`

---

## Activity Types

| Type | Description | Example |
|------|-------------|---------|
| `experiment` | Practical experiments applying teachings | Practice detachment in daily tasks |
| `meditation` | Guided meditations based on verse themes | Equanimity meditation for balance |
| `reflection` | Journaling prompts and self-inquiry | Reflect on personal dharma |
| `practice` | Action-based spiritual practices | Perform selfless service |
| `journaling` | Structured journaling exercises | Witness your thoughts on paper |
| `daily_challenge` | Full-day mindfulness challenges | Mindful action throughout the day |

## Difficulty Levels

- **beginner**: Suitable for newcomers, 10-20 minutes
- **intermediate**: Requires some practice, 20-45 minutes  
- **advanced**: For experienced practitioners, 45+ minutes or full day

## Current Data

- **Total Activities**: 75 verse activities
- **Coverage**: First 3 chapters (Chapters 1, 2, 3)
- **Activities per Verse**: 2-3 activities
- **Verses per Chapter**: 10 verses

## Integration with Frontend

### Recommended Flow

1. When user opens a verse detail page, fetch verse activities:
   ```dart
   final activities = await dio.get('/api/verse-activities/chapter/$chapterId/verse/$verseNumber');
   ```

2. Display activities in expandable cards or dedicated "Activities/Experiments" tab

3. For each activity, show:
   - Title and description
   - Activity type icon
   - Duration and difficulty badge
   - Step-by-step instructions
   - Benefits list
   - "Start Activity" button

4. Track completion (future feature):
   - Mark activities as completed
   - Store progress in user profile
   - Show completion badges

## Example Usage

### Fetch Activities for Verse
```bash
curl http://192.168.0.125:3000/api/verse-activities/chapter/1/verse/1
```

### Display in Flutter
```dart
class VerseActivitiesSection extends ConsumerWidget {
  final String chapterId;
  final int verseNumber;
  
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final activitiesAsync = ref.watch(
      verseActivitiesProvider((chapterId, verseNumber))
    );
    
    return activitiesAsync.when(
      data: (activities) => ListView.builder(
        itemCount: activities.length,
        itemBuilder: (context, index) {
          final activity = activities[index];
          return VerseActivityCard(activity: activity);
        },
      ),
      loading: () => CircularProgressIndicator(),
      error: (err, stack) => Text('Error loading activities'),
    );
  }
}
```

## Next Steps for Frontend

1. ✅ Create `VerseActivity` Dart model with Freezed
2. ✅ Add repository method to fetch activities
3. ✅ Create provider for verse activities
4. ✅ Build `VerseActivityCard` widget
5. ✅ Add activities section to verse detail page
6. ✅ Implement activity completion tracking

## Benefits of This Feature

- **Practical Application**: Users can apply Geeta teachings in real life
- **Structured Guidance**: Step-by-step instructions make it easy to practice
- **Varied Approaches**: Different activity types suit different learning styles
- **Progressive Difficulty**: Users can start simple and advance gradually
- **Measurable Progress**: Duration and difficulty help users track growth

---

**Server Status**: ✅ Running at `http://192.168.0.125:3000`  
**Database**: ✅ MongoDB with 75 verse activities seeded
