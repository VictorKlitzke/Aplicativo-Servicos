import 'package:flutter/material.dart';
import 'package:mobile/data/views/widget/themes/app_themes_colors.dart';

class AppCardWidget extends StatelessWidget {
  final Widget? title;
  final Widget? subtitle;
  final Widget? leadingIcon;
  final Widget? child;
  final Color backgroundColor;
  final EdgeInsetsGeometry padding;
  final double borderRadius;
  final double elevation;
  final VoidCallback? onTap;
  final double? width; // nova
  final double? height; // nova

  const AppCardWidget({
    Key? key,
    this.title,
    this.subtitle,
    this.leadingIcon,
    this.child,
    this.backgroundColor = AppColors.light,
    this.padding = const EdgeInsets.all(16),
    this.borderRadius = 12.0,
    this.elevation = 4.0,
    this.onTap,
    this.width,
    this.height,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Widget content = Padding(
      padding: padding,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          if (title != null || leadingIcon != null)
            Row(
              children: [
                if (leadingIcon != null) ...[
                  leadingIcon!,
                  const SizedBox(width: 12),
                ],
                if (title != null)
                  Expanded(
                    child: DefaultTextStyle(
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: AppColors.dark,
                      ),
                      child: title!,
                    ),
                  ),
              ],
            ),
          if (subtitle != null) ...[
            if (title != null || leadingIcon != null) SizedBox(height: 6),
            DefaultTextStyle(
              style: TextStyle(fontSize: 14, color: AppColors.readonly),
              child: subtitle!,
            ),
          ],
          if (child != null) ...[
            if (title != null || subtitle != null || leadingIcon != null)
              SizedBox(height: 12),
            child!,
          ],
        ],
      ),
    );

    if (width != null || height != null) {
      content = SizedBox(width: width, height: height, child: content);
    }

    return Card(
      elevation: elevation,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(borderRadius),
      ),
      color: backgroundColor,
      child: InkWell(
        borderRadius: BorderRadius.circular(borderRadius),
        onTap: onTap,
        child: content,
      ),
    );
  }
}
