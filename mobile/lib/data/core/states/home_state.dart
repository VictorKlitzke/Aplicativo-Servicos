class HomeState {
  final bool isLoading;
  final String? error;
  final String? nomeUsuario;
  final Map<String, List<Map<String, dynamic>>> groupedServices;

  HomeState({
    this.isLoading = false,
    this.error,
    this.groupedServices = const {},
    this.nomeUsuario
  });

  HomeState copyWith({
    bool? isLoading,
    String? error,
    Map<String, List<Map<String, dynamic>>>? groupedServices,
    String? nomeUsuario
  }) {
    return HomeState(
      isLoading: isLoading ?? this.isLoading,
      error: error ?? this.error,
      groupedServices: groupedServices ?? this.groupedServices,
      nomeUsuario: nomeUsuario ?? this.nomeUsuario
    );
  }
}
