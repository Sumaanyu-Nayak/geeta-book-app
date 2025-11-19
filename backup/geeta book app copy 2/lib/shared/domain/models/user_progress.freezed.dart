// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'user_progress.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models');

UserProgress _$UserProgressFromJson(Map<String, dynamic> json) {
  return _UserProgress.fromJson(json);
}

/// @nodoc
mixin _$UserProgress {
  String get userId => throw _privateConstructorUsedError;
  int get totalChaptersCompleted => throw _privateConstructorUsedError;
  int get totalVersesCompleted => throw _privateConstructorUsedError;
  int get totalActivitiesCompleted => throw _privateConstructorUsedError;
  Map<String, ChapterProgress> get chapterProgress =>
      throw _privateConstructorUsedError;
  DateTime? get lastUpdated => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $UserProgressCopyWith<UserProgress> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $UserProgressCopyWith<$Res> {
  factory $UserProgressCopyWith(
          UserProgress value, $Res Function(UserProgress) then) =
      _$UserProgressCopyWithImpl<$Res, UserProgress>;
  @useResult
  $Res call(
      {String userId,
      int totalChaptersCompleted,
      int totalVersesCompleted,
      int totalActivitiesCompleted,
      Map<String, ChapterProgress> chapterProgress,
      DateTime? lastUpdated});
}

/// @nodoc
class _$UserProgressCopyWithImpl<$Res, $Val extends UserProgress>
    implements $UserProgressCopyWith<$Res> {
  _$UserProgressCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? userId = null,
    Object? totalChaptersCompleted = null,
    Object? totalVersesCompleted = null,
    Object? totalActivitiesCompleted = null,
    Object? chapterProgress = null,
    Object? lastUpdated = freezed,
  }) {
    return _then(_value.copyWith(
      userId: null == userId
          ? _value.userId
          : userId // ignore: cast_nullable_to_non_nullable
              as String,
      totalChaptersCompleted: null == totalChaptersCompleted
          ? _value.totalChaptersCompleted
          : totalChaptersCompleted // ignore: cast_nullable_to_non_nullable
              as int,
      totalVersesCompleted: null == totalVersesCompleted
          ? _value.totalVersesCompleted
          : totalVersesCompleted // ignore: cast_nullable_to_non_nullable
              as int,
      totalActivitiesCompleted: null == totalActivitiesCompleted
          ? _value.totalActivitiesCompleted
          : totalActivitiesCompleted // ignore: cast_nullable_to_non_nullable
              as int,
      chapterProgress: null == chapterProgress
          ? _value.chapterProgress
          : chapterProgress // ignore: cast_nullable_to_non_nullable
              as Map<String, ChapterProgress>,
      lastUpdated: freezed == lastUpdated
          ? _value.lastUpdated
          : lastUpdated // ignore: cast_nullable_to_non_nullable
              as DateTime?,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$UserProgressImplCopyWith<$Res>
    implements $UserProgressCopyWith<$Res> {
  factory _$$UserProgressImplCopyWith(
          _$UserProgressImpl value, $Res Function(_$UserProgressImpl) then) =
      __$$UserProgressImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {String userId,
      int totalChaptersCompleted,
      int totalVersesCompleted,
      int totalActivitiesCompleted,
      Map<String, ChapterProgress> chapterProgress,
      DateTime? lastUpdated});
}

/// @nodoc
class __$$UserProgressImplCopyWithImpl<$Res>
    extends _$UserProgressCopyWithImpl<$Res, _$UserProgressImpl>
    implements _$$UserProgressImplCopyWith<$Res> {
  __$$UserProgressImplCopyWithImpl(
      _$UserProgressImpl _value, $Res Function(_$UserProgressImpl) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? userId = null,
    Object? totalChaptersCompleted = null,
    Object? totalVersesCompleted = null,
    Object? totalActivitiesCompleted = null,
    Object? chapterProgress = null,
    Object? lastUpdated = freezed,
  }) {
    return _then(_$UserProgressImpl(
      userId: null == userId
          ? _value.userId
          : userId // ignore: cast_nullable_to_non_nullable
              as String,
      totalChaptersCompleted: null == totalChaptersCompleted
          ? _value.totalChaptersCompleted
          : totalChaptersCompleted // ignore: cast_nullable_to_non_nullable
              as int,
      totalVersesCompleted: null == totalVersesCompleted
          ? _value.totalVersesCompleted
          : totalVersesCompleted // ignore: cast_nullable_to_non_nullable
              as int,
      totalActivitiesCompleted: null == totalActivitiesCompleted
          ? _value.totalActivitiesCompleted
          : totalActivitiesCompleted // ignore: cast_nullable_to_non_nullable
              as int,
      chapterProgress: null == chapterProgress
          ? _value._chapterProgress
          : chapterProgress // ignore: cast_nullable_to_non_nullable
              as Map<String, ChapterProgress>,
      lastUpdated: freezed == lastUpdated
          ? _value.lastUpdated
          : lastUpdated // ignore: cast_nullable_to_non_nullable
              as DateTime?,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$UserProgressImpl implements _UserProgress {
  const _$UserProgressImpl(
      {required this.userId,
      required this.totalChaptersCompleted,
      required this.totalVersesCompleted,
      required this.totalActivitiesCompleted,
      final Map<String, ChapterProgress> chapterProgress = const {},
      this.lastUpdated})
      : _chapterProgress = chapterProgress;

  factory _$UserProgressImpl.fromJson(Map<String, dynamic> json) =>
      _$$UserProgressImplFromJson(json);

  @override
  final String userId;
  @override
  final int totalChaptersCompleted;
  @override
  final int totalVersesCompleted;
  @override
  final int totalActivitiesCompleted;
  final Map<String, ChapterProgress> _chapterProgress;
  @override
  @JsonKey()
  Map<String, ChapterProgress> get chapterProgress {
    if (_chapterProgress is EqualUnmodifiableMapView) return _chapterProgress;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableMapView(_chapterProgress);
  }

  @override
  final DateTime? lastUpdated;

  @override
  String toString() {
    return 'UserProgress(userId: $userId, totalChaptersCompleted: $totalChaptersCompleted, totalVersesCompleted: $totalVersesCompleted, totalActivitiesCompleted: $totalActivitiesCompleted, chapterProgress: $chapterProgress, lastUpdated: $lastUpdated)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$UserProgressImpl &&
            (identical(other.userId, userId) || other.userId == userId) &&
            (identical(other.totalChaptersCompleted, totalChaptersCompleted) ||
                other.totalChaptersCompleted == totalChaptersCompleted) &&
            (identical(other.totalVersesCompleted, totalVersesCompleted) ||
                other.totalVersesCompleted == totalVersesCompleted) &&
            (identical(
                    other.totalActivitiesCompleted, totalActivitiesCompleted) ||
                other.totalActivitiesCompleted == totalActivitiesCompleted) &&
            const DeepCollectionEquality()
                .equals(other._chapterProgress, _chapterProgress) &&
            (identical(other.lastUpdated, lastUpdated) ||
                other.lastUpdated == lastUpdated));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(
      runtimeType,
      userId,
      totalChaptersCompleted,
      totalVersesCompleted,
      totalActivitiesCompleted,
      const DeepCollectionEquality().hash(_chapterProgress),
      lastUpdated);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$UserProgressImplCopyWith<_$UserProgressImpl> get copyWith =>
      __$$UserProgressImplCopyWithImpl<_$UserProgressImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$UserProgressImplToJson(
      this,
    );
  }
}

abstract class _UserProgress implements UserProgress {
  const factory _UserProgress(
      {required final String userId,
      required final int totalChaptersCompleted,
      required final int totalVersesCompleted,
      required final int totalActivitiesCompleted,
      final Map<String, ChapterProgress> chapterProgress,
      final DateTime? lastUpdated}) = _$UserProgressImpl;

  factory _UserProgress.fromJson(Map<String, dynamic> json) =
      _$UserProgressImpl.fromJson;

  @override
  String get userId;
  @override
  int get totalChaptersCompleted;
  @override
  int get totalVersesCompleted;
  @override
  int get totalActivitiesCompleted;
  @override
  Map<String, ChapterProgress> get chapterProgress;
  @override
  DateTime? get lastUpdated;
  @override
  @JsonKey(ignore: true)
  _$$UserProgressImplCopyWith<_$UserProgressImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

ChapterProgress _$ChapterProgressFromJson(Map<String, dynamic> json) {
  return _ChapterProgress.fromJson(json);
}

/// @nodoc
mixin _$ChapterProgress {
  String get chapterId => throw _privateConstructorUsedError;
  int get versesCompleted => throw _privateConstructorUsedError;
  int get totalVerses => throw _privateConstructorUsedError;
  int get activitiesCompleted => throw _privateConstructorUsedError;
  int get totalActivities => throw _privateConstructorUsedError;
  bool get isCompleted => throw _privateConstructorUsedError;
  DateTime? get completedAt => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $ChapterProgressCopyWith<ChapterProgress> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $ChapterProgressCopyWith<$Res> {
  factory $ChapterProgressCopyWith(
          ChapterProgress value, $Res Function(ChapterProgress) then) =
      _$ChapterProgressCopyWithImpl<$Res, ChapterProgress>;
  @useResult
  $Res call(
      {String chapterId,
      int versesCompleted,
      int totalVerses,
      int activitiesCompleted,
      int totalActivities,
      bool isCompleted,
      DateTime? completedAt});
}

/// @nodoc
class _$ChapterProgressCopyWithImpl<$Res, $Val extends ChapterProgress>
    implements $ChapterProgressCopyWith<$Res> {
  _$ChapterProgressCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? chapterId = null,
    Object? versesCompleted = null,
    Object? totalVerses = null,
    Object? activitiesCompleted = null,
    Object? totalActivities = null,
    Object? isCompleted = null,
    Object? completedAt = freezed,
  }) {
    return _then(_value.copyWith(
      chapterId: null == chapterId
          ? _value.chapterId
          : chapterId // ignore: cast_nullable_to_non_nullable
              as String,
      versesCompleted: null == versesCompleted
          ? _value.versesCompleted
          : versesCompleted // ignore: cast_nullable_to_non_nullable
              as int,
      totalVerses: null == totalVerses
          ? _value.totalVerses
          : totalVerses // ignore: cast_nullable_to_non_nullable
              as int,
      activitiesCompleted: null == activitiesCompleted
          ? _value.activitiesCompleted
          : activitiesCompleted // ignore: cast_nullable_to_non_nullable
              as int,
      totalActivities: null == totalActivities
          ? _value.totalActivities
          : totalActivities // ignore: cast_nullable_to_non_nullable
              as int,
      isCompleted: null == isCompleted
          ? _value.isCompleted
          : isCompleted // ignore: cast_nullable_to_non_nullable
              as bool,
      completedAt: freezed == completedAt
          ? _value.completedAt
          : completedAt // ignore: cast_nullable_to_non_nullable
              as DateTime?,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$ChapterProgressImplCopyWith<$Res>
    implements $ChapterProgressCopyWith<$Res> {
  factory _$$ChapterProgressImplCopyWith(_$ChapterProgressImpl value,
          $Res Function(_$ChapterProgressImpl) then) =
      __$$ChapterProgressImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {String chapterId,
      int versesCompleted,
      int totalVerses,
      int activitiesCompleted,
      int totalActivities,
      bool isCompleted,
      DateTime? completedAt});
}

/// @nodoc
class __$$ChapterProgressImplCopyWithImpl<$Res>
    extends _$ChapterProgressCopyWithImpl<$Res, _$ChapterProgressImpl>
    implements _$$ChapterProgressImplCopyWith<$Res> {
  __$$ChapterProgressImplCopyWithImpl(
      _$ChapterProgressImpl _value, $Res Function(_$ChapterProgressImpl) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? chapterId = null,
    Object? versesCompleted = null,
    Object? totalVerses = null,
    Object? activitiesCompleted = null,
    Object? totalActivities = null,
    Object? isCompleted = null,
    Object? completedAt = freezed,
  }) {
    return _then(_$ChapterProgressImpl(
      chapterId: null == chapterId
          ? _value.chapterId
          : chapterId // ignore: cast_nullable_to_non_nullable
              as String,
      versesCompleted: null == versesCompleted
          ? _value.versesCompleted
          : versesCompleted // ignore: cast_nullable_to_non_nullable
              as int,
      totalVerses: null == totalVerses
          ? _value.totalVerses
          : totalVerses // ignore: cast_nullable_to_non_nullable
              as int,
      activitiesCompleted: null == activitiesCompleted
          ? _value.activitiesCompleted
          : activitiesCompleted // ignore: cast_nullable_to_non_nullable
              as int,
      totalActivities: null == totalActivities
          ? _value.totalActivities
          : totalActivities // ignore: cast_nullable_to_non_nullable
              as int,
      isCompleted: null == isCompleted
          ? _value.isCompleted
          : isCompleted // ignore: cast_nullable_to_non_nullable
              as bool,
      completedAt: freezed == completedAt
          ? _value.completedAt
          : completedAt // ignore: cast_nullable_to_non_nullable
              as DateTime?,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$ChapterProgressImpl implements _ChapterProgress {
  const _$ChapterProgressImpl(
      {required this.chapterId,
      required this.versesCompleted,
      required this.totalVerses,
      required this.activitiesCompleted,
      required this.totalActivities,
      this.isCompleted = false,
      this.completedAt});

  factory _$ChapterProgressImpl.fromJson(Map<String, dynamic> json) =>
      _$$ChapterProgressImplFromJson(json);

  @override
  final String chapterId;
  @override
  final int versesCompleted;
  @override
  final int totalVerses;
  @override
  final int activitiesCompleted;
  @override
  final int totalActivities;
  @override
  @JsonKey()
  final bool isCompleted;
  @override
  final DateTime? completedAt;

  @override
  String toString() {
    return 'ChapterProgress(chapterId: $chapterId, versesCompleted: $versesCompleted, totalVerses: $totalVerses, activitiesCompleted: $activitiesCompleted, totalActivities: $totalActivities, isCompleted: $isCompleted, completedAt: $completedAt)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$ChapterProgressImpl &&
            (identical(other.chapterId, chapterId) ||
                other.chapterId == chapterId) &&
            (identical(other.versesCompleted, versesCompleted) ||
                other.versesCompleted == versesCompleted) &&
            (identical(other.totalVerses, totalVerses) ||
                other.totalVerses == totalVerses) &&
            (identical(other.activitiesCompleted, activitiesCompleted) ||
                other.activitiesCompleted == activitiesCompleted) &&
            (identical(other.totalActivities, totalActivities) ||
                other.totalActivities == totalActivities) &&
            (identical(other.isCompleted, isCompleted) ||
                other.isCompleted == isCompleted) &&
            (identical(other.completedAt, completedAt) ||
                other.completedAt == completedAt));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(
      runtimeType,
      chapterId,
      versesCompleted,
      totalVerses,
      activitiesCompleted,
      totalActivities,
      isCompleted,
      completedAt);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$ChapterProgressImplCopyWith<_$ChapterProgressImpl> get copyWith =>
      __$$ChapterProgressImplCopyWithImpl<_$ChapterProgressImpl>(
          this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$ChapterProgressImplToJson(
      this,
    );
  }
}

abstract class _ChapterProgress implements ChapterProgress {
  const factory _ChapterProgress(
      {required final String chapterId,
      required final int versesCompleted,
      required final int totalVerses,
      required final int activitiesCompleted,
      required final int totalActivities,
      final bool isCompleted,
      final DateTime? completedAt}) = _$ChapterProgressImpl;

  factory _ChapterProgress.fromJson(Map<String, dynamic> json) =
      _$ChapterProgressImpl.fromJson;

  @override
  String get chapterId;
  @override
  int get versesCompleted;
  @override
  int get totalVerses;
  @override
  int get activitiesCompleted;
  @override
  int get totalActivities;
  @override
  bool get isCompleted;
  @override
  DateTime? get completedAt;
  @override
  @JsonKey(ignore: true)
  _$$ChapterProgressImplCopyWith<_$ChapterProgressImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
