// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'verse_activity.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$ActivityInstructionImpl _$$ActivityInstructionImplFromJson(
        Map<String, dynamic> json) =>
    _$ActivityInstructionImpl(
      step: (json['step'] as num).toInt(),
      description: json['description'] as String,
    );

Map<String, dynamic> _$$ActivityInstructionImplToJson(
        _$ActivityInstructionImpl instance) =>
    <String, dynamic>{
      'step': instance.step,
      'description': instance.description,
    };

_$VerseActivityImpl _$$VerseActivityImplFromJson(Map<String, dynamic> json) =>
    _$VerseActivityImpl(
      id: json['id'] as String,
      chapterId: json['chapterId'] as String,
      verseNumber: (json['verseNumber'] as num).toInt(),
      title: json['title'] as String,
      description: json['description'] as String,
      type: $enumDecode(_$VerseActivityTypeEnumMap, json['type']),
      instructions: (json['instructions'] as List<dynamic>)
          .map((e) => ActivityInstruction.fromJson(e as Map<String, dynamic>))
          .toList(),
      duration: json['duration'] as String,
      difficulty: $enumDecode(_$ActivityDifficultyEnumMap, json['difficulty']),
      benefits:
          (json['benefits'] as List<dynamic>).map((e) => e as String).toList(),
      iconUrl: json['iconUrl'] as String?,
      order: (json['order'] as num).toInt(),
      createdAt: json['createdAt'] == null
          ? null
          : DateTime.parse(json['createdAt'] as String),
      updatedAt: json['updatedAt'] == null
          ? null
          : DateTime.parse(json['updatedAt'] as String),
    );

Map<String, dynamic> _$$VerseActivityImplToJson(_$VerseActivityImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'chapterId': instance.chapterId,
      'verseNumber': instance.verseNumber,
      'title': instance.title,
      'description': instance.description,
      'type': _$VerseActivityTypeEnumMap[instance.type]!,
      'instructions': instance.instructions,
      'duration': instance.duration,
      'difficulty': _$ActivityDifficultyEnumMap[instance.difficulty]!,
      'benefits': instance.benefits,
      'iconUrl': instance.iconUrl,
      'order': instance.order,
      'createdAt': instance.createdAt?.toIso8601String(),
      'updatedAt': instance.updatedAt?.toIso8601String(),
    };

const _$VerseActivityTypeEnumMap = {
  VerseActivityType.experiment: 'experiment',
  VerseActivityType.meditation: 'meditation',
  VerseActivityType.reflection: 'reflection',
  VerseActivityType.practice: 'practice',
  VerseActivityType.journaling: 'journaling',
  VerseActivityType.dailyChallenge: 'daily_challenge',
};

const _$ActivityDifficultyEnumMap = {
  ActivityDifficulty.beginner: 'beginner',
  ActivityDifficulty.intermediate: 'intermediate',
  ActivityDifficulty.advanced: 'advanced',
};
