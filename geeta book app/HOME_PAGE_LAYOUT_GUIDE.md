# Home Page Layout - Before & After

## Before
```
┌─────────────────────────────────┐
│     Bhagavad Geeta App          │ <- Simple AppBar
│                                 │
│         🕉️ Logo                 │
│                                 │
│    18 Chapters of Wisdom        │
└─────────────────────────────────┘
```

## After
```
┌─────────────────────────────────┐
│ 📱 Bhagavad Geeta App       👤  │ <- QR Scanner (left) + User Profile (right)
│                                 │
│         🕉️ Logo                 │
│                                 │
│    18 Chapters of Wisdom        │
└─────────────────────────────────┘
```

## New Features

### 1. QR Scanner (Top-Left Icon 📱)
**Icon**: QR code scanner icon  
**Action**: Tap to open full-screen QR scanner  
**Features**:
- Camera view with scanning overlay
- Torch toggle for low light
- Camera flip (front/back)
- Auto-detect QR codes
- Shows scanned result

### 2. User Profile (Top-Right Icon 👤)
**Icon**: Person icon  
**Action**: Tap to open side drawer from right  
**Features**:
- User profile header
- Progress tracking
- Bookmarks
- Reading history
- Dark mode toggle ⚫️⚪️
- Settings
- Help & About

## User Drawer Menu Structure

```
╔═══════════════════════════════╗
║ [Gradient Header]             ║
║   👤 User Avatar               ║
║   User Name                   ║
║   user@example.com            ║
╠═══════════════════════════════╣
║ 📊 Your Progress              ║
║ 🔖 Bookmarks                  ║
║ 📜 History                    ║
║ 🔔 Notifications              ║
║ 🌙 Dark Mode          [⚪️]    ║
║ ⚙️ Settings                    ║
║ ❓ Help & Support              ║
║ ℹ️ About                       ║
║ 🚪 Sign Out                   ║
╠═══════════════════════════════╣
║ Bhagavad Geeta • v1.0.0       ║
╚═══════════════════════════════╝
```

## QR Scanner Layout

```
┌─────────────────────────────────┐
│ 💡              📹         ✕    │ <- Torch, Flip, Close
│                                 │
│                                 │
│     ╔═══════════════════╗       │
│     ║                   ║       │
│     ║   [QR Scanning    ║       │ <- Scanning frame
│     ║    Frame Area]    ║       │
│     ║                   ║       │
│     ╚═══════════════════╝       │
│                                 │
│   "Point camera at QR code"     │ <- Instructions
│                                 │
└─────────────────────────────────┘
```

## Navigation Flow

### From Home to QR Scanner:
```
Home Page
    ↓ (Tap QR icon)
QR Scanner Page
    ↓ (Scan code)
Result Dialog
    ↓ (Close)
Back to QR Scanner or Home
```

### From Home to User Profile:
```
Home Page
    ↓ (Tap person icon)
User Drawer (slides from right)
    ↓ (Select menu item)
Various app sections
    or
Toggle dark mode
```

## Code Integration Points

### home_page.dart
```dart
SliverAppBar(
  leading: IconButton(
    icon: Icon(Icons.qr_code_scanner),
    onPressed: () => context.push('/qr-scanner'),
  ),
  actions: [
    IconButton(
      icon: Icon(Icons.person),
      onPressed: () => Scaffold.of(context).openEndDrawer(),
    ),
  ],
  // ... rest of AppBar
)

// In Scaffold
Scaffold(
  endDrawer: const UserDrawer(),
  body: CustomScrollView(/* ... */),
)
```

### app_router.dart
```dart
routes: [
  // ... existing routes
  GoRoute(
    path: '/qr-scanner',
    name: 'qrScanner',
    builder: (context, state) => const QRScannerPage(),
  ),
]
```

## Theme Integration

Both new features follow the app's design system:

### Colors:
- Primary gradient: Orange (#FF6B35) to Pink (#F7931E)
- Background: White (light mode) / Dark (dark mode)
- Text: Dark grey (light mode) / White (dark mode)
- Accent: Orange for highlights

### Animations:
- Drawer slide: 250ms
- QR scanner overlay: Smooth fade
- Menu items: Subtle hover/tap effects
- All animations 50-70% faster than default

### Icons:
- Material Icons used throughout
- Consistent icon sizing
- Orange accent color for active states

## Accessibility

### QR Scanner:
- Tooltip: "Scan QR Code"
- Instructions overlay
- Clear visual feedback
- Close button always visible

### User Drawer:
- Tooltip: "Profile"
- Clear menu labels
- High contrast text
- Large tap targets
- Semantic labels for screen readers

## Testing Notes

1. **QR Scanner** requires:
   - Real device (not simulator)
   - Camera permissions granted
   - Good lighting or use torch

2. **User Drawer**:
   - Works on all platforms
   - Dark mode persists
   - Smooth animations

3. **Both Features**:
   - No compilation errors ✅
   - Proper navigation ✅
   - Theme-aware ✅
   - Responsive design ✅
