import 'package:flutter/material.dart';

class PadraoButton extends StatelessWidget {
  final VoidCallback? onPressed;
  final String text;
  final Color textColor;
  final Color backgroundColor;
  final double fontSize;
  final EdgeInsetsGeometry padding;
  final Alignment textAlign;
  final bool isLoading;
  final double borderRadius;
  final double elevation;
  final IconData? icon;
  final bool useSpaceBetween;

  const PadraoButton({
    super.key,
    required this.onPressed,
    required this.text,
    required this.textColor,
    required this.backgroundColor,
    required this.fontSize,
    required this.padding,
    required this.textAlign,
    this.isLoading = false,
    this.borderRadius = 4.0,
    this.elevation = 4.0,
    this.icon,
    this.useSpaceBetween = false,
  });

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: textAlign,
      child: SizedBox(
        width: 140,
        height: 50,
        child: ElevatedButton(
          onPressed: isLoading ? null : onPressed,
          style: ElevatedButton.styleFrom(
            foregroundColor: textColor,
            backgroundColor: backgroundColor,
            padding: padding,
            elevation: elevation,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(borderRadius),
            ),
          ),
          child:
              isLoading
                  ? SizedBox(
                    width: 24,
                    height: 24,
                    child: CircularProgressIndicator(
                      color: textColor,
                      strokeWidth: 3,
                    ),
                  )
                  : Row(
                    mainAxisSize: MainAxisSize.min,
                    mainAxisAlignment:
                        useSpaceBetween
                            ? MainAxisAlignment.spaceBetween
                            : MainAxisAlignment.center,
                    children: [
                      if (icon != null) ...[
                        Icon(icon, color: textColor),
                        SizedBox(width: 8),
                      ],
                      Text(
                        text,
                        style: TextStyle(fontSize: fontSize),
                        textAlign: TextAlign.center,
                      ),
                    ],
                  ),
        ),
      ),
    );
  }
}
