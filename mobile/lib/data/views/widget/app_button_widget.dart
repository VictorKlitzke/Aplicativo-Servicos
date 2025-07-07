import 'package:flutter/material.dart';
import 'package:mobile/data/views/widget/themes/app_themes_colors.dart';

class AppButtonWidget extends StatelessWidget {
  final VoidCallback? onPressed;
  final String text;
  final Color textColor;
  final double fontSize;
  final EdgeInsetsGeometry padding;
  final Alignment textAlign;
  final bool isLoading;
  final double borderRadius;
  final IconData? icon;
  final bool useSpaceBetween;
  final Color? backgroundColor; // novo, opcional, se setar ignora gradiente
  final double elevation; // novo

  const AppButtonWidget({
    super.key,
    required this.onPressed,
    required this.text,
    required this.textColor,
    required this.fontSize,
    required this.padding,
    required this.textAlign,
    this.isLoading = false,
    this.borderRadius = 8.0,
    this.icon,
    this.useSpaceBetween = false,
    this.backgroundColor,
    this.elevation = 4.0,
  });

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      style: ElevatedButton.styleFrom(
        padding: EdgeInsets.zero,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(borderRadius),
        ),
        backgroundColor: backgroundColor ?? Colors.transparent,
        elevation: elevation,
        shadowColor:
            backgroundColor != null ? Colors.black45 : Colors.transparent,
      ),
      onPressed: isLoading ? null : onPressed,
      child: Ink(
        decoration:
            backgroundColor == null
                ? BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [AppColors.primary, AppColors.secondary],
                  ),
                  borderRadius: BorderRadius.circular(borderRadius),
                )
                : BoxDecoration(
                  color: backgroundColor,
                  borderRadius: BorderRadius.circular(borderRadius),
                ),
        child: Container(
          padding: padding,
          alignment: textAlign,
          child:
              isLoading
                  ? const SizedBox(
                    height: 24,
                    width: 24,
                    child: CircularProgressIndicator(
                      valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                      strokeWidth: 2.5,
                    ),
                  )
                  : Row(
                    mainAxisAlignment:
                        useSpaceBetween
                            ? MainAxisAlignment.spaceBetween
                            : MainAxisAlignment.center,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      if (icon != null) ...[
                        Icon(icon, color: textColor),
                        const SizedBox(width: 8),
                      ],
                      Text(
                        text,
                        style: TextStyle(
                          color: textColor,
                          fontSize: fontSize,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
        ),
      ),
    );
  }
}
