class LoginState {
  final bool isLoading;
  final String? error;
  final String? userEmail;

  const LoginState({this.isLoading = false, this.error, this.userEmail});

  LoginState copyWith({bool? isLoading, String? error, String? userEmail}) {
    return LoginState(
      isLoading: isLoading ?? this.isLoading,
      error: error,
      userEmail: userEmail,
    );
  }
}
