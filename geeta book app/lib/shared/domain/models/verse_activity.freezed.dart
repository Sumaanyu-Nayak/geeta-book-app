// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'verse_activity.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models');

ActivityInstruction _$ActivityInstructionFromJson(Map<String, dynamic> json) {
  return _ActivityInstruction.fromJson(json);
}

/// @nodoc
mixin _$ActivityInstruction {
  int get step => throw _privateConstructorUsedError;
  String get description => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $ActivityInstructionCopyWith<ActivityInstruction> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $ActivityInstructionCopyWith<$Res> {
  factory $ActivityInstructionCopyWith(
          ActivityInstruction value, $Res Function(ActivityInstruction) then) =
      _$ActivityInstructionCopyWithImpl<$Res, ActivityInstruction>;
  @useResult
  $Res call({int step, String description});
}

/// @nodoc
class _$ActivityInstructionCopyWithImpl<$Res, $Val extends ActivityInstruction>
    implements $ActivityInstructionCopyWith<$Res> {
  _$ActivityInstructionCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? step = null,
    Object? description = null,
  }) {
    return _then(_value.copyWith(
      step: null == step
          ? _value.step
          : step // ignore: cast_nullable_to_non_nullable
              as int,
      description: null == description
          ? _value.description
          : description // ignore: cast_nullable_to_non_nullable
              as String,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$ActivityInstructionImplCopyWith<$Res>
    implements $ActivityInstructionCopyWith<$Res> {
  factory _$$ActivityInstructionImplCopyWith(_$ActivityInstructionImpl value,
          $Res Function(_$ActivityInstructionImpl) then) =
      __$$ActivityInstructionImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({int step, String description});
}

/// @nodoc
class __$$ActivityInstructionImplCopyWithImpl<$Res>
    extends _$ActivityInstructionCopyWithImpl<$Res, _$ActivityInstructionImpl>
    implements _$$ActivityInstructionImplCopyWith<$Res> {
  __$$ActivityInstructionImplCopyWithImpl(_$ActivityInstructionImpl _value,
      $Res Function(_$ActivityInstructionImpl) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? step = null,
    Object? description = null,
  }) {
    return _then(_$ActivityInstructionImpl(
      step: null == step
          ? _value.step
          : step // ignore: cast_nullable_to_non_nullable
              as int,
      description: null == description
          ? _value.description
          : description // ignore: cast_nullable_to_non_nullable
              as String,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$ActivityInstructionImpl implements _ActivityInstruction {
  const _$ActivityInstructionImpl(
      {required this.step, required this.description});

  factory _$ActivityInstructionImpl.fromJson(Map<String, dynamic> json) =>
      _$$ActivityInstructionImplFromJson(json);

  @override
  final int step;
  @override
  final String description;

  @override
  String toString() {
    return 'ActivityInstruction(step: $step, description: $description)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$ActivityInstructionImpl &&
            (identical(other.step, step) || other.step == step) &&
            (identical(other.description, description) ||
                other.description == description));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(runtimeType, step, description);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$ActivityInstructionImplCopyWith<_$ActivityInstructionImpl> get copyWith =>
      __$$ActivityInstructionImplCopyWithImpl<_$ActivityInstructionImpl>(
          this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$ActivityInstructionImplToJson(
      this,
    );
  }
}

abstract class _ActivityInstruction implements ActivityInstruction {
  const factory _ActivityInstruction(
      {required final int step,
      required final String description}) = _$ActivityInstructionImpl;

  factory _ActivityInstruction.fromJson(Map<String, dynamic> json) =
      _$ActivityInstructionImpl.fromJson;

  @override
  int get step;
  @override
  String get description;
  @override
  @JsonKey(ignore: true)
  _$$ActivityInstructionImplCopyWith<_$ActivityInstructionImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

VerseActivity _$VerseActivityFromJson(Map<String, dynamic> json) {
  return _VerseActivity.fromJson(json);
}

/// @nodoc
mixin _$VerseActivity {
  String get id => throw _privateConstructorUsedError;
  String get chapterId => throw _privateConstructorUsedError;
  int get verseNumber => throw _privateConstructorUsedError;
  String get title => throw _privateConstructorUsedError;
  String get description => throw _privateConstructorUsedError;
  VerseActivityType get type => throw _privateConstructorUsedError;
  List<ActivityInstruction> get instructions =>
      throw _privateConstructorUsedError;
  String get duration => throw _privateConstructorUsedError;
  ActivityDifficulty get difficulty => throw _privateConstructorUsedError;
  List<String> get benefits => throw _privateConstructorUsedError;
  String? get iconUrl => throw _privateConstructorUsedError;
  int get order => throw _privateConstructorUsedError;
  DateTime? get createdAt => throw _privateConstructorUsedError;
  DateTime? get updatedAt => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $VerseActivityCopyWith<VerseActivity> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $VerseActivityCopyWith<$Res> {
  factory $VerseActivityCopyWith(
          VerseActivity value, $Res Function(VerseActivity) then) =
      _$VerseActivityCopyWithImpl<$Res, VerseActivity>;
  @useResult
  $Res call(
      {String id,
      String chapterId,
      int verseNumber,
      String title,
      String description,
      VerseActivityType type,
      List<ActivityInstruction> instructions,
      String duration,
      ActivityDifficulty difficulty,
      List<String> benefits,
      String? iconUrl,
      int order,
      DateTime? createdAt,
      DateTime? updatedAt});
}

/// @nodoc
class _$VerseActivityCopyWithImpl<$Res, $Val extends VerseActivity>
    implements $VerseActivityCopyWith<$Res> {
  _$VerseActivityCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? chapterId = null,
    Object? verseNumber = null,
    Object? title = null,
    Object? description = null,
    Object? type = null,
    Object? instructions = null,
    Object? duration = null,
    Object? difficulty = null,
    Object? benefits = null,
    Object? iconUrl = freezed,
    Object? order = null,
    Object? createdAt = freezed,
    Object? updatedAt = freezed,
  }) {
    return _then(_value.copyWith(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      chapterId: null == chapterId
          ? _value.chapterId
          : chapterId // ignore: cast_nullable_to_non_nullable
              as String,
      verseNumber: null == verseNumber
          ? _value.verseNumber
          : verseNumber // ignore: cast_nullable_to_non_nullable
              as int,
      title: null == title
          ? _value.title
          : title // ignore: cast_nullable_to_non_nullable
              as String,
      description: null == description
          ? _value.description
          : description // ignore: cast_nullable_to_non_nullable
              as String,
      type: null == type
          ? _value.type
          : type // ignore: cast_nullable_to_non_nullable
              as VerseActivityType,
      instructions: null == instructions
          ? _value.instructions
          : instructions // ignore: cast_nullable_to_non_nullable
              as List<ActivityInstruction>,
      duration: null == duration
          ? _value.duration
          : duration // ignore: cast_nullable_to_non_nullable
              as String,
      difficulty: null == difficulty
          ? _value.difficulty
          : difficulty // ignore: cast_nullable_to_non_nullable
              as ActivityDifficulty,
      benefits: null == benefits
          ? _value.benefits
          : benefits // ignore: cast_nullable_to_non_nullable
              as List<String>,
      iconUrl: freezed == iconUrl
          ? _value.iconUrl
          : iconUrl // ignore: cast_nullable_to_non_nullable
              as String?,
      order: null == order
          ? _value.order
          : order // ignore: cast_nullable_to_non_nullable
              as int,
      createdAt: freezed == createdAt
          ? _value.createdAt
          : createdAt // ignore: cast_nullable_to_non_nullable
              as DateTime?,
      updatedAt: freezed == updatedAt
          ? _value.updatedAt
          : updatedAt // ignore: cast_nullable_to_non_nullable
              as DateTime?,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$VerseActivityImplCopyWith<$Res>
    implements $VerseActivityCopyWith<$Res> {
  factory _$$VerseActivityImplCopyWith(
          _$VerseActivityImpl value, $Res Function(_$VerseActivityImpl) then) =
      __$$VerseActivityImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {String id,
      String chapterId,
      int verseNumber,
      String title,
      String description,
      VerseActivityType type,
      List<ActivityInstruction> instructions,
      String duration,
      ActivityDifficulty difficulty,
      List<String> benefits,
      String? iconUrl,
      int order,
      DateTime? createdAt,
      DateTime? updatedAt});
}

/// @nodoc
class __$$VerseActivityImplCopyWithImpl<$Res>
    extends _$VerseActivityCopyWithImpl<$Res, _$VerseActivityImpl>
    implements _$$VerseActivityImplCopyWith<$Res> {
  __$$VerseActivityImplCopyWithImpl(
      _$VerseActivityImpl _value, $Res Function(_$VerseActivityImpl) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? chapterId = null,
    Object? verseNumber = null,
    Object? title = null,
    Object? description = null,
    Object? type = null,
    Object? instructions = null,
    Object? duration = null,
    Object? difficulty = null,
    Object? benefits = null,
    Object? iconUrl = freezed,
    Object? order = null,
    Object? createdAt = freezed,
    Object? updatedAt = freezed,
  }) {
    return _then(_$VerseActivityImpl(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      chapterId: null == chapterId
          ? _value.chapterId
          : chapterId // ignore: cast_nullable_to_non_nullable
              as String,
      verseNumber: null == verseNumber
          ? _value.verseNumber
          : verseNumber // ignore: cast_nullable_to_non_nullable
              as int,
      title: null == title
          ? _value.title
          : title // ignore: cast_nullable_to_non_nullable
              as String,
      description: null == description
          ? _value.description
          : description // ignore: cast_nullable_to_non_nullable
              as String,
      type: null == type
          ? _value.type
          : type // ignore: cast_nullable_to_non_nullable
              as VerseActivityType,
      instructions: null == instructions
          ? _value._instructions
          : instructions // ignore: cast_nullable_to_non_nullable
              as List<ActivityInstruction>,
      duration: null == duration
          ? _value.duration
          : duration // ignore: cast_nullable_to_non_nullable
              as String,
      difficulty: null == difficulty
          ? _value.difficulty
          : difficulty // ignore: cast_nullable_to_non_nullable
              as ActivityDifficulty,
      benefits: null == benefits
          ? _value._benefits
          : benefits // ignore: cast_nullable_to_non_nullable
              as List<String>,
      iconUrl: freezed == iconUrl
          ? _value.iconUrl
          : iconUrl // ignore: cast_nullable_to_non_nullable
              as String?,
      order: null == order
          ? _value.order
          : order // ignore: cast_nullable_to_non_nullable
              as int,
      createdAt: freezed == createdAt
          ? _value.createdAt
          : createdAt // ignore: cast_nullable_to_non_nullable
              as DateTime?,
      updatedAt: freezed == updatedAt
          ? _value.updatedAt
          : updatedAt // ignore: cast_nullable_to_non_nullable
              as DateTime?,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$VerseActivityImpl implements _VerseActivity {
  const _$VerseActivityImpl(
      {required this.id,
      required this.chapterId,
      required this.verseNumber,
      required this.title,
      required this.description,
      required this.type,
      required final List<ActivityInstruction> instructions,
      required this.duration,
      required this.difficulty,
      required final List<String> benefits,
      this.iconUrl,
      required this.order,
      this.createdAt,
      this.updatedAt})
      : _instructions = instructions,
        _benefits = benefits;

  factory _$VerseActivityImpl.fromJson(Map<String, dynamic> json) =>
      _$$VerseActivityImplFromJson(json);

  @override
  final String id;
  @override
  final String chapterId;
  @override
  final int verseNumber;
  @override
  final String title;
  @override
  final String description;
  @override
  final VerseActivityType type;
  final List<ActivityInstruction> _instructions;
  @override
  List<ActivityInstruction> get instructions {
    if (_instructions is EqualUnmodifiableListView) return _instructions;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_instructions);
  }

  @override
  final String duration;
  @override
  final ActivityDifficulty difficulty;
  final List<String> _benefits;
  @override
  List<String> get benefits {
    if (_benefits is EqualUnmodifiableListView) return _benefits;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_benefits);
  }

  @override
  final String? iconUrl;
  @override
  final int order;
  @override
  final DateTime? createdAt;
  @override
  final DateTime? updatedAt;

  @override
  String toString() {
    return 'VerseActivity(id: $id, chapterId: $chapterId, verseNumber: $verseNumber, title: $title, description: $description, type: $type, instructions: $instructions, duration: $duration, difficulty: $difficulty, benefits: $benefits, iconUrl: $iconUrl, order: $order, createdAt: $createdAt, updatedAt: $updatedAt)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$VerseActivityImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.chapterId, chapterId) ||
                other.chapterId == chapterId) &&
            (identical(other.verseNumber, verseNumber) ||
                other.verseNumber == verseNumber) &&
            (identical(other.title, title) || other.title == title) &&
            (identical(other.description, description) ||
                other.description == description) &&
            (identical(other.type, type) || other.type == type) &&
            const DeepCollectionEquality()
                .equals(other._instructions, _instructions) &&
            (identical(other.duration, duration) ||
                other.duration == duration) &&
            (identical(other.difficulty, difficulty) ||
                other.difficulty == difficulty) &&
            const DeepCollectionEquality().equals(other._benefits, _benefits) &&
            (identical(other.iconUrl, iconUrl) || other.iconUrl == iconUrl) &&
            (identical(other.order, order) || other.order == order) &&
            (identical(other.createdAt, createdAt) ||
                other.createdAt == createdAt) &&
            (identical(other.updatedAt, updatedAt) ||
                other.updatedAt == updatedAt));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(
      runtimeType,
      id,
      chapterId,
      verseNumber,
      title,
      description,
      type,
      const DeepCollectionEquality().hash(_instructions),
      duration,
      difficulty,
      const DeepCollectionEquality().hash(_benefits),
      iconUrl,
      order,
      createdAt,
      updatedAt);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$VerseActivityImplCopyWith<_$VerseActivityImpl> get copyWith =>
      __$$VerseActivityImplCopyWithImpl<_$VerseActivityImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$VerseActivityImplToJson(
      this,
    );
  }
}

abstract class _VerseActivity implements VerseActivity {
  const factory _VerseActivity(
      {required final String id,
      required final String chapterId,
      required final int verseNumber,
      required final String title,
      required final String description,
      required final VerseActivityType type,
      required final List<ActivityInstruction> instructions,
      required final String duration,
      required final ActivityDifficulty difficulty,
      required final List<String> benefits,
      final String? iconUrl,
      required final int order,
      final DateTime? createdAt,
      final DateTime? updatedAt}) = _$VerseActivityImpl;

  factory _VerseActivity.fromJson(Map<String, dynamic> json) =
      _$VerseActivityImpl.fromJson;

  @override
  String get id;
  @override
  String get chapterId;
  @override
  int get verseNumber;
  @override
  String get title;
  @override
  String get description;
  @override
  VerseActivityType get type;
  @override
  List<ActivityInstruction> get instructions;
  @override
  String get duration;
  @override
  ActivityDifficulty get difficulty;
  @override
  List<String> get benefits;
  @override
  String? get iconUrl;
  @override
  int get order;
  @override
  DateTime? get createdAt;
  @override
  DateTime? get updatedAt;
  @override
  @JsonKey(ignore: true)
  _$$VerseActivityImplCopyWith<_$VerseActivityImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
