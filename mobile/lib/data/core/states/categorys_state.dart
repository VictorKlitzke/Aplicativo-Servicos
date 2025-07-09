class CategorysState {
  final bool isLoading;
  final String? error;
  final String? category;
  final String? descCategory;

  const CategorysState({this.isLoading = false, this.error, this.category, this.descCategory});

  CategorysState copyWith({bool? isLoading, String? error, String? category, String? descCategory}) {
    return CategorysState(
      isLoading: isLoading ?? this.isLoading,
      error: error,
      category: category,
      descCategory: descCategory
    );
  }
}