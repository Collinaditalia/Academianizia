<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>📖 Bíblia Interativa — Leitura Cronológica</title>
    <link href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;1,300&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <style>
        :root {
            --primary: #6C3CE1;
            --primary-light: #8B5CF6;
            --primary-dark: #4C1D95;
            --secondary: #F59E0B;
            --accent: #10B981;
            --bg-dark: #0F0A1A;
            --bg-card: #1A1128;
            --bg-card-hover: #231740;
            --text-primary: #F8F5FF;
            --text-secondary: #A78BFA;
            --text-muted: #7C6BAA;
            --border: rgba(139, 92, 246, 0.2);
            --glow: rgba(108, 60, 225, 0.4);
            --success: #10B981;
            --warning: #F59E0B;
            --danger: #EF4444;
            --gradient-1: linear-gradient(135deg, #6C3CE1, #3B82F6);
            --gradient-2: linear-gradient(135deg, #F59E0B, #EF4444);
            --gradient-3: linear-gradient(135deg, #10B981, #3B82F6);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', sans-serif;
            background: var(--bg-dark);
            color: var(--text-primary);
            min-height: 100vh;
            overflow-x: hidden;
        }

        /* Background animado */
        body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: 
                radial-gradient(ellipse at 20% 50%, rgba(108, 60, 225, 0.08) 0%, transparent 50%),
                radial-gradient(ellipse at 80% 20%, rgba(59, 130, 246, 0.06) 0%, transparent 50%),
                radial-gradient(ellipse at 50% 80%, rgba(245, 158, 11, 0.04) 0%, transparent 50%);
            pointer-events: none;
            z-index: 0;
        }

        /* ===== HEADER ===== */
        .header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            background: rgba(15, 10, 26, 0.95);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid var(--border);
            padding: 0.8rem 2rem;
        }

        .header-content {
            max-width: 1400px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1.5rem;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 0.7rem;
            font-size: 1.4rem;
            font-weight: 800;
            background: var(--gradient-1);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            white-space: nowrap;
        }

        .logo i {
            background: var(--gradient-1);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-size: 1.6rem;
        }

        /* Progresso Global */
        .global-progress {
            flex: 1;
            max-width: 500px;
        }

        .progress-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.3rem;
        }

        .progress-label {
            font-size: 0.75rem;
            color: var(--text-muted);
            font-weight: 500;
        }

        .progress-percent {
            font-size: 0.85rem;
            font-weight: 700;
            color: var(--secondary);
        }

        .progress-bar-container {
            width: 100%;
            height: 8px;
            background: rgba(139, 92, 246, 0.15);
            border-radius: 10px;
            overflow: hidden;
            position: relative;
        }

        .progress-bar-fill {
            height: 100%;
            border-radius: 10px;
            transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1), background 0.5s ease;
            position: relative;
            overflow: hidden;
        }

        .progress-bar-fill::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }

        .nav-tabs {
            display: flex;
            gap: 0.3rem;
        }

        .nav-tab {
            padding: 0.5rem 1rem;
            border-radius: 8px;
            border: none;
            background: transparent;
            color: var(--text-muted);
            cursor: pointer;
            font-size: 0.8rem;
            font-weight: 500;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.4rem;
            white-space: nowrap;
        }

        .nav-tab:hover {
            background: rgba(139, 92, 246, 0.1);
            color: var(--text-primary);
        }

        .nav-tab.active {
            background: var(--gradient-1);
            color: white;
            box-shadow: 0 4px 15px var(--glow);
        }

        /* ===== MAIN LAYOUT ===== */
        .main-container {
            display: flex;
            margin-top: 70px;
            min-height: calc(100vh - 70px);
            position: relative;
            z-index: 1;
        }

        /* ===== SIDEBAR ===== */
        .sidebar {
            width: 320px;
            min-width: 320px;
            background: rgba(26, 17, 40, 0.8);
            backdrop-filter: blur(10px);
            border-right: 1px solid var(--border);
            height: calc(100vh - 70px);
            position: fixed;
            top: 70px;
            left: 0;
            overflow-y: auto;
            padding: 1rem 0;
            transition: transform 0.3s ease;
        }

        .sidebar::-webkit-scrollbar {
            width: 4px;
        }

        .sidebar::-webkit-scrollbar-track {
            background: transparent;
        }

        .sidebar::-webkit-scrollbar-thumb {
            background: var(--primary);
            border-radius: 4px;
        }

        .sidebar-section {
            padding: 0.5rem 1rem;
        }

        .sidebar-title {
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            color: var(--text-muted);
            margin-bottom: 0.8rem;
            font-weight: 600;
            padding-left: 0.5rem;
        }

        .era-group {
            margin-bottom: 1rem;
        }

        .era-label {
            font-size: 0.75rem;
            font-weight: 700;
            color: var(--secondary);
            padding: 0.4rem 0.8rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
            border-radius: 6px;
            transition: background 0.2s;
        }

        .era-label:hover {
            background: rgba(245, 158, 11, 0.1);
        }

        .era-label i {
            font-size: 0.7rem;
        }

        .book-item {
            padding: 0.55rem 0.8rem 0.55rem 2rem;
            cursor: pointer;
            border-radius: 6px;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 0.82rem;
            color: var(--text-secondary);
            position: relative;
        }

        .book-item:hover {
            background: rgba(139, 92, 246, 0.1);
            color: var(--text-primary);
        }

        .book-item.active {
            background: rgba(108, 60, 225, 0.2);
            color: var(--text-primary);
            border-left: 3px solid var(--primary);
        }

        .book-item.completed {
            color: var(--success);
        }

        .book-item.completed::after {
            content: '✓';
            color: var(--success);
            font-weight: bold;
            font-size: 0.8rem;
        }

        .book-progress-mini {
            width: 40px;
            height: 3px;
            background: rgba(139, 92, 246, 0.2);
            border-radius: 3px;
            overflow: hidden;
        }

        .book-progress-mini-fill {
            height: 100%;
            background: var(--primary-light);
            border-radius: 3px;
            transition: width 0.3s;
        }

        /* ===== CONTENT AREA ===== */
        .content-area {
            flex: 1;
            margin-left: 320px;
            padding: 2rem;
            max-width: calc(100% - 320px);
        }

        /* ===== TABS CONTENT ===== */
        .tab-content {
            display: none;
            animation: fadeIn 0.4s ease;
        }

        .tab-content.active {
            display: block;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* ===== READING VIEW ===== */
        .reading-header {
            text-align: center;
            margin-bottom: 2rem;
            padding: 2rem;
            background: var(--bg-card);
            border-radius: 16px;
            border: 1px solid var(--border);
            position: relative;
            overflow: hidden;
        }

        .reading-header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: var(--gradient-1);
        }

        .reading-era-tag {
            display: inline-block;
            padding: 0.3rem 0.8rem;
            background: rgba(245, 158, 11, 0.15);
            color: var(--secondary);
            border-radius: 20px;
            font-size: 0.7rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 0.8rem;
        }

        .reading-title {
            font-family: 'Merriweather', serif;
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            background: var(--gradient-1);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .reading-subtitle {
            color: var(--text-muted);
            font-size: 0.9rem;
        }

        .reading-meta {
            display: flex;
            justify-content: center;
            gap: 1.5rem;
            margin-top: 1rem;
            flex-wrap: wrap;
        }

        .meta-item {
            display: flex;
            align-items: center;
            gap: 0.4rem;
            font-size: 0.8rem;
            color: var(--text-muted);
        }

        .meta-item i {
            color: var(--primary-light);
        }

        /* Chapter selector */
        .chapter-selector {
            display: flex;
            flex-wrap: wrap;
            gap: 0.4rem;
            justify-content: center;
            margin: 1.5rem 0;
            padding: 1rem;
            background: var(--bg-card);
            border-radius: 12px;
            border: 1px solid var(--border);
        }

        .chapter-btn {
            width: 38px;
            height: 38px;
            border-radius: 8px;
            border: 1px solid var(--border);
            background: transparent;
            color: var(--text-secondary);
            cursor: pointer;
            font-size: 0.8rem;
            font-weight: 500;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .chapter-btn:hover {
            background: rgba(139, 92, 246, 0.2);
            border-color: var(--primary-light);
            color: var(--text-primary);
        }

        .chapter-btn.active {
            background: var(--gradient-1);
            border-color: transparent;
            color: white;
            box-shadow: 0 4px 12px var(--glow);
        }

        .chapter-btn.read {
            background: rgba(16, 185, 129, 0.2);
            border-color: var(--success);
            color: var(--success);
        }

        /* Reading content */
        .reading-content {
            background: var(--bg-card);
            border-radius: 16px;
            border: 1px solid var(--border);
            padding: 2.5rem;
            margin-bottom: 2rem;
            line-height: 1.9;
            font-family: 'Merriweather', serif;
            font-size: 1.05rem;
            color: var(--text-primary);
            position: relative;
        }

        .verse {
            display: inline;
            cursor: pointer;
            transition: all 0.2s;
            border-radius: 3px;
            padding: 1px 2px;
        }

        .verse:hover {
            background: rgba(139, 92, 246, 0.2);
            color: var(--primary-light);
        }

        .verse-number {
            font-family: 'Inter', sans-serif;
            font-size: 0.65rem;
            font-weight: 700;
            color: var(--primary-light);
            vertical-align: super;
            margin-right: 2px;
            margin-left: 4px;
        }

        .word {
            cursor: pointer;
            transition: all 0.15s;
            border-radius: 2px;
            padding: 0 1px;
        }

        .word:hover {
            background: rgba(245, 158, 11, 0.25);
            color: var(--secondary);
            text-decoration: underline;
            text-decoration-color: var(--secondary);
            text-underline-offset: 3px;
        }

        /* Mark as read button */
        .reading-actions {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin: 2rem 0;
            flex-wrap: wrap;
        }

        .btn {
            padding: 0.8rem 1.8rem;
            border-radius: 10px;
            border: none;
            cursor: pointer;
            font-size: 0.9rem;
            font-weight: 600;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .btn-primary {
            background: var(--gradient-1);
            color: white;
            box-shadow: 0 4px 15px var(--glow);
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px var(--glow);
        }

        .btn-success {
            background: var(--gradient-3);
            color: white;
            box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
        }

        .btn-success:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
        }

        .btn-outline {
            background: transparent;
            color: var(--text-secondary);
            border: 1px solid var(--border);
        }

        .btn-outline:hover {
            background: rgba(139, 92, 246, 0.1);
            border-color: var(--primary-light);
        }

        /* ===== WORD POPUP ===== */
        .word-popup {
            display: none;
            position: fixed;
            z-index: 2000;
            background: var(--bg-card);
            border: 1px solid var(--primary-light);
            border-radius: 12px;
            padding: 1.2rem;
            max-width: 350px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 30px var(--glow);
            animation: popIn 0.2s ease;
        }

        .word-popup.show {
            display: block;
        }

        @keyframes popIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
        }

        .word-popup-title {
            font-size: 1.1rem;
            font-weight: 700;
            color: var(--secondary);
            margin-bottom: 0.3rem;
        }

        .word-popup-original {
            font-size: 0.85rem;
            color: var(--primary-light);
            font-style: italic;
            margin-bottom: 0.5rem;
        }

        .word-popup-meaning {
            font-size: 0.85rem;
            color: var(--text-secondary);
            line-height: 1.6;
        }

        .word-popup-type {
            display: inline-block;
            padding: 0.15rem 0.5rem;
            background: rgba(108, 60, 225, 0.2);
            color: var(--primary-light);
            border-radius: 4px;
            font-size: 0.65rem;
            font-weight: 600;
            text-transform: uppercase;
            margin-bottom: 0.5rem;
        }

        .word-popup-close {
            position: absolute;
            top: 0.5rem;
            right: 0.7rem;
            background: none;
            border: none;
            color: var(--text-muted);
            cursor: pointer;
            font-size: 1rem;
        }

        /* ===== MEDIA SECTION ===== */
        .media-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 1.5rem;
            margin: 2rem 0;
        }

        .media-card {
            background: var(--bg-card);
            border-radius: 16px;
            border: 1px solid var(--border);
            overflow: hidden;
            transition: all 0.3s;
        }

        .media-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 40px rgba(0,0,0,0.3);
            border-color: var(--primary-light);
        }

        .media-card-header {
            padding: 1rem 1.2rem;
            border-bottom: 1px solid var(--border);
            display: flex;
            align-items: center;
            gap: 0.7rem;
        }

        .media-card-header i {
            color: var(--primary-light);
        }

        .media-card-header h3 {
            font-size: 0.9rem;
            font-weight: 600;
        }

        .video-container {
            position: relative;
            padding-bottom: 56.25%;
            height: 0;
            overflow: hidden;
        }

        .video-container iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: none;
        }

        .map-container {
            height: 300px;
            overflow: hidden;
            border-radius: 0 0 16px 16px;
        }

        .map-container iframe {
            width: 100%;
            height: 100%;
            border: none;
        }

        /* ===== CHARACTERS GALLERY ===== */
        .characters-section {
            margin: 2rem 0;
        }

        .section-title {
            font-size: 1.3rem;
            font-weight: 700;
            margin-bottom: 1.2rem;
            display: flex;
            align-items: center;
            gap: 0.7rem;
        }

        .section-title i {
            color: var(--secondary);
        }

        .characters-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            gap: 1rem;
        }

        .character-card {
            background: var(--bg-card);
            border-radius: 12px;
            border: 1px solid var(--border);
            padding: 1.2rem;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s;
        }

        .character-card:hover {
            transform: translateY(-4px);
            border-color: var(--primary-light);
            box-shadow: 0 8px 30px var(--glow);
        }

        .character-avatar {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            margin: 0 auto 0.8rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.8rem;
            background: var(--gradient-1);
            color: white;
        }

        .character-name {
            font-size: 0.85rem;
            font-weight: 600;
            margin-bottom: 0.2rem;
        }

        .character-role {
            font-size: 0.7rem;
            color: var(--text-muted);
        }

        /* ===== STATS DASHBOARD ===== */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-bottom: 2rem;
        }

        .stat-card {
            background: var(--bg-card);
            border-radius: 12px;
            border: 1px solid var(--border);
            padding: 1.5rem;
            text-align: center;
            transition: all 0.3s;
        }

        .stat-card:hover {
            border-color: var(--primary-light);
        }

        .stat-icon {
            width: 50px;
            height: 50px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 0.8rem;
            font-size: 1.3rem;
        }

        .stat-value {
            font-size: 1.8rem;
            font-weight: 800;
            margin-bottom: 0.2rem;
        }

        .stat-label {
            font-size: 0.75rem;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        /* ===== SEARCH ===== */
        .search-container {
            position: relative;
            margin-bottom: 1.5rem;
        }

        .search-input {
            width: 100%;
            padding: 0.8rem 1.2rem 0.8rem 2.8rem;
            border-radius: 10px;
            border: 1px solid var(--border);
            background: var(--bg-card);
            color: var(--text-primary);
            font-size: 0.9rem;
            outline: none;
            transition: all 0.3s;
        }

        .search-input:focus {
            border-color: var(--primary-light);
            box-shadow: 0 0 20px var(--glow);
        }

        .search-icon {
            position: absolute;
            left: 1rem;
            top: 50%;
            transform: translateY(-50%);
            color: var(--text-muted);
        }

        /* ===== TIMELINE ===== */
        .timeline {
            position: relative;
            padding-left: 2rem;
        }

        .timeline::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 2px;
            background: var(--gradient-1);
        }

        .timeline-item {
            position: relative;
            margin-bottom: 1.5rem;
            padding: 1rem 1.2rem;
            background: var(--bg-card);
            border-radius: 10px;
            border: 1px solid var(--border);
            cursor: pointer;
            transition: all 0.3s;
        }

        .timeline-item:hover {
            border-color: var(--primary-light);
            transform: translateX(5px);
        }

        .timeline-item::before {
            content: '';
            position: absolute;
            left: -2.35rem;
            top: 1.2rem;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: var(--primary-light);
            border: 2px solid var(--bg-dark);
        }

        .timeline-item.completed::before {
            background: var(--success);
        }

        .timeline-date {
            font-size: 0.7rem;
            color: var(--secondary);
            font-weight: 600;
            margin-bottom: 0.3rem;
        }

        .timeline-title {
            font-size: 0.95rem;
            font-weight: 600;
            margin-bottom: 0.2rem;
        }

        .timeline-desc {
            font-size: 0.8rem;
            color: var(--text-muted);
        }

        /* ===== DICTIONARY TAB ===== */
        .dict-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 1rem;
        }

        .dict-card {
            background: var(--bg-card);
            border-radius: 12px;
            border: 1px solid var(--border);
            padding: 1.2rem;
            cursor: pointer;
            transition: all 0.3s;
        }

        .dict-card:hover {
            border-color: var(--secondary);
            transform: translateY(-2px);
        }

        .dict-word {
            font-size: 1.1rem;
            font-weight: 700;
            color: var(--secondary);
            margin-bottom: 0.2rem;
        }

        .dict-original {
            font-size: 0.8rem;
            color: var(--primary-light);
            font-style: italic;
            margin-bottom: 0.5rem;
        }

        .dict-meaning {
            font-size: 0.82rem;
            color: var(--text-secondary);
            line-height: 1.5;
        }

        /* ===== RESPONSIVE ===== */
        .sidebar-toggle {
            display: none;
            position: fixed;
            bottom: 1.5rem;
            left: 1.5rem;
            z-index: 1001;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--gradient-1);
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            box-shadow: 0 4px 20px var(--glow);
        }

        @media (max-width: 1024px) {
            .sidebar {
                transform: translateX(-100%);
                z-index: 999;
            }

            .sidebar.open {
                transform: translateX(0);
            }

            .content-area {
                margin-left: 0;
                max-width: 100%;
                padding: 1.5rem;
            }

            .sidebar-toggle {
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .nav-tabs {
                display: none;
            }

            .header-content {
                flex-wrap: wrap;
            }
        }

        @media (max-width: 768px) {
            .reading-content {
                padding: 1.5rem;
                font-size: 0.95rem;
            }

            .reading-title {
                font-size: 1.5rem;
            }

            .media-grid {
                grid-template-columns: 1fr;
            }

            .stats-grid {
                grid-template-columns: repeat(2, 1fr);
            }

            .characters-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        /* ===== MOBILE NAV ===== */
        .mobile-nav {
            display: none;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(15, 10, 26, 0.98);
            backdrop-filter: blur(20px);
            border-top: 1px solid var(--border);
            padding: 0.5rem;
            z-index: 1000;
        }

        @media (max-width: 1024px) {
            .mobile-nav {
                display: flex;
                justify-content: space-around;
            }

            .main-container {
                padding-bottom: 60px;
            }
        }

        .mobile-nav-btn {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.2rem;
            padding: 0.5rem;
            border: none;
            background: none;
            color: var(--text-muted);
            cursor: pointer;
            font-size: 0.65rem;
            transition: color 0.2s;
        }

        .mobile-nav-btn.active {
            color: var(--primary-light);
        }

        .mobile-nav-btn i {
            font-size: 1.2rem;
        }

        /* ===== CELEBRATION ===== */
        .celebration-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.8);
            z-index: 3000;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s;
        }

        .celebration-overlay.show {
            display: flex;
        }

        .celebration-content {
            text-align: center;
            padding: 3rem;
            background: var(--bg-card);
            border-radius: 20px;
            border: 2px solid var(--secondary);
            max-width: 400px;
        }

        .celebration-icon {
            font-size: 4rem;
            margin-bottom: 1rem;
        }

        .celebration-title {
            font-size: 1.5rem;
            font-weight: 800;
            color: var(--secondary);
            margin-bottom: 0.5rem;
        }

        .celebration-text {
            color: var(--text-secondary);
            margin-bottom: 1.5rem;
        }

        /* Tooltip for reading tip */
        .reading-tip {
            background: rgba(245, 158, 11, 0.1);
            border: 1px solid rgba(245, 158, 11, 0.3);
            border-radius: 10px;
            padding: 1rem 1.2rem;
            margin: 1.5rem 0;
            display: flex;
            align-items: flex-start;
            gap: 0.8rem;
        }

        .reading-tip i {
            color: var(--secondary);
            font-size: 1.2rem;
            margin-top: 0.1rem;
        }

        .reading-tip-text {
            font-size: 0.85rem;
            color: var(--text-secondary);
            line-height: 1.5;
        }

        /* Image gallery */
        .image-gallery {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 1rem;
            margin: 1.5rem 0;
        }

        .gallery-item {
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid var(--border);
            transition: all 0.3s;
            cursor: pointer;
        }

        .gallery-item:hover {
            transform: scale(1.03);
            border-color: var(--primary-light);
        }

        .gallery-item img {
            width: 100%;
            height: 150px;
            object-fit: cover;
        }

        .gallery-caption {
            padding: 0.7rem;
            background: var(--bg-card);
            font-size: 0.75rem;
            text-align: center;
            color: var(--text-secondary);
        }
    </style>
</head>
<body>

    <!-- HEADER -->
    <header class="header">
        <div class="header-content">
            <div class="logo">
                <i class="fas fa-book-bible"></i>
                <span>Bíblia Interativa</span>
            </div>
            <div class="global-progress">
                <div class="progress-info">
                    <span class="progress-label">Progresso da Leitura</span>
                    <span class="progress-percent" id="globalPercent">0%</span>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-bar-fill" id="globalProgressBar" style="width: 0%; background: var(--gradient-2);"></div>
                </div>
            </div>
            <nav class="nav-tabs">
                <button class="nav-tab active" data-tab="reading"><i class="fas fa-book-open"></i> Leitura</button>
                <button class="nav-tab" data-tab="timeline"><i class="fas fa-timeline"></i> Linha do Tempo</button>
                <button class="nav-tab" data-tab="media"><i class="fas fa-play-circle"></i> Mídia</button>
                <button class="nav-tab" data-tab="dictionary"><i class="fas fa-spell-check"></i> Dicionário</button>
                <button class="nav-tab" data-tab="stats"><i class="fas fa-chart-pie"></i> Estatísticas</button>
            </nav>
        </div>
    </header>

    <!-- SIDEBAR TOGGLE (mobile) -->
    <button class="sidebar-toggle" id="sidebarToggle">
        <i class="fas fa-bars"></i>
    </button>

    <!-- MAIN -->
    <div class="main-container">
        <!-- SIDEBAR -->
        <aside class="sidebar" id="sidebar">
            <div class="sidebar-section">
                <div class="search-container">
                    <i class="fas fa-search search-icon"></i>
                    <input type="text" class="search-input" id="bookSearch" placeholder="Buscar livro...">
                </div>
            </div>

            <div class="sidebar-section" id="sidebarBooks">
                <!-- Populated by JS -->
            </div>
        </aside>

        <!-- CONTENT -->
        <main class="content-area">
            <!-- TAB: READING -->
            <div class="tab-content active" id="tab-reading">
                <div class="reading-header" id="readingHeader">
                    <span class="reading-era-tag" id="readingEra">A Criação</span>
                    <h1 class="reading-title" id="readingTitle">Gênesis</h1>
                    <p class="reading-subtitle" id="readingSubtitle">O livro das origens — Criação, queda e promessas</p>
                    <div class="reading-meta">
                        <span class="meta-item"><i class="fas fa-calendar"></i> <span id="metaDate">~4000 a.C.</span></span>
                        <span class="meta-item"><i class="fas fa-user"></i> <span id="metaAuthor">Moisés</span></span>
                        <span class="meta-item"><i class="fas fa-file-alt"></i> <span id="metaChapters">50 capítulos</span></span>
                        <span class="meta-item"><i class="fas fa-map-marker-alt"></i> <span id="metaLocation">Mesopotâmia / Egito</span></span>
                    </div>
                </div>

                <div class="chapter-selector" id="chapterSelector">
                    <!-- Populated by JS -->
                </div>

                <div class="reading-tip" id="readingTip">
                    <i class="fas fa-lightbulb"></i>
                    <p class="reading-tip-text" id="tipText">
                        <strong>Dica de leitura:</strong> Clique em qualquer palavra para ver seu significado original em hebraico ou grego, contexto bíblico e definição de dicionário.
                    </p>
                </div>

                <div class="reading-content" id="readingContent">
                    <!-- Populated by JS -->
                </div>

                <div class="reading-actions">
                    <button class="btn btn-outline" id="prevChapter"><i class="fas fa-arrow-left"></i> Anterior</button>
                    <button class="btn btn-success" id="markRead"><i class="fas fa-check-circle"></i> Marcar como Lido</button>
                    <button class="btn btn-outline" id="nextChapter">Próximo <i class="fas fa-arrow-right"></i></button>
                </div>

                <!-- Characters for current book -->
                <div class="characters-section" id="charactersSection">
                    <h2 class="section-title"><i class="fas fa-users"></i> Personagens deste Livro</h2>
                    <div class="characters-grid" id="charactersGrid">
                        <!-- Populated by JS -->
                    </div>
                </div>
            </div>

            <!-- TAB: TIMELINE -->
            <div class="tab-content" id="tab-timeline">
                <h2 class="section-title"><i class="fas fa-timeline"></i> Linha do Tempo Bíblica</h2>
                <p style="color: var(--text-muted); margin-bottom: 1.5rem; font-size: 0.9rem;">
                    Explore os eventos bíblicos na ordem em que aconteceram historicamente.
                </p>
                <div class="timeline" id="timelineContainer">
                    <!-- Populated by JS -->
                </div>
            </div>

            <!-- TAB: MEDIA -->
            <div class="tab-content" id="tab-media">
                <h2 class="section-title"><i class="fas fa-play-circle"></i> Vídeos e Mapas Interativos</h2>
                <p style="color: var(--text-muted); margin-bottom: 1.5rem; font-size: 0.9rem;">
                    Assista vídeos explicativos e explore os mapas das terras bíblicas.
                </p>
                <div class="media-grid" id="mediaGrid">
                    <!-- Populated by JS -->
                </div>
            </div>

            <!-- TAB: DICTIONARY -->
            <div class="tab-content" id="tab-dictionary">
                <h2 class="section-title"><i class="fas fa-spell-check"></i> Dicionário Bíblico</h2>
                <div class="search-container" style="margin-bottom: 1.5rem;">
                    <i class="fas fa-search search-icon"></i>
                    <input type="text" class="search-input" id="dictSearch" placeholder="Buscar palavra...">
                </div>
                <div class="dict-grid" id="dictGrid">
                    <!-- Populated by JS -->
                </div>
            </div>

            <!-- TAB: STATS -->
            <div class="tab-content" id="tab-stats">
                <h2 class="section-title"><i class="fas fa-chart-pie"></i> Suas Estatísticas</h2>
                <div class="stats-grid" id="statsGrid">
                    <!-- Populated by JS -->
                </div>
                <div style="margin-top: 2rem;">
                    <h3 style="font-size: 1rem; margin-bottom: 1rem; color: var(--text-secondary);">Progresso por Era</h3>
                    <div id="eraProgress"></div>
                </div>
            </div>
        </main>
    </div>

    <!-- WORD POPUP -->
    <div class="word-popup" id="wordPopup">
        <button class="word-popup-close" id="wordPopupClose"><i class="fas fa-times"></i></button>
        <span class="word-popup-type" id="popupType">Hebraico</span>
        <h3 class="word-popup-title" id="popupTitle">Palavra</h3>
        <p class="word-popup-original" id="popupOriginal">Original</p>
        <p class="word-popup-meaning" id="popupMeaning">Significado</p>
    </div>

    <!-- CELEBRATION -->
    <div class="celebration-overlay" id="celebrationOverlay">
        <div class="celebration-content">
            <div class="celebration-icon">🎉</div>
            <h2 class="celebration-title" id="celebrationTitle">Parabéns!</h2>
            <p class="celebration-text" id="celebrationText">Você completou este livro!</p>
            <button class="btn btn-primary" onclick="closeCelebration()">Continuar Lendo</button>
        </div>
    </div>

    <!-- MOBILE NAV -->
    <nav class="mobile-nav">
        <button class="mobile-nav-btn active" data-tab="reading"><i class="fas fa-book-open"></i><span>Leitura</span></button>
        <button class="mobile-nav-btn" data-tab="timeline"><i class="fas fa-timeline"></i><span>Timeline</span></button>
        <button class="mobile-nav-btn" data-tab="media"><i class="fas fa-play"></i><span>Mídia</span></button>
        <button class="mobile-nav-btn" data-tab="dictionary"><i class="fas fa-spell-check"></i><span>Dicionário</span></button>
        <button class="mobile-nav-btn" data-tab="stats"><i class="fas fa-chart-pie"></i><span>Stats</span></button>
    </nav>

    <script>
    // ===== DATA =====
    const bibleData = {
        books: [
            // ERA 1: ORIGENS
            { id: 'job', name: 'Jó', era: 'origens', eraLabel: '🌍 Origens', date: '~2100 a.C.', author: 'Desconhecido', chapters: 42, location: 'Terrá (Arábia)', description: 'O sofrimento do justo e a soberania de Deus', icon: '🔥',
              characters: [
                { name: 'Jó', role: 'Homem justo e paciente', emoji: '🧔' },
                { name: 'Deus', role: 'Soberano Criador', emoji: '✨' },
                { name: 'Satanás', role: 'O acusador', emoji: '🐍' },
                { name: 'Esposa de Jó', role: 'Esposa de Jó', emoji: '👩' }
              ]
            },
            { id: 'genesis', name: 'Gênesis', era: 'origens', eraLabel: '🌍 Origens', date: '~4000-1800 a.C.', author: 'Moisés', chapters: 50, location: 'Mesopotâmia, Canaã, Egito', description: 'O livro das origens — Criação, queda e patriarcas', icon: '🌅',
              characters: [
                { name: 'Adão', role: 'Primeiro homem', emoji: '🧔' },
                { name: 'Eva', role: 'Primeira mulher', emoji: '👩' },
                { name: 'Noé', role: 'Construtor da arca', emoji: '🚢' },
                { name: 'Abraão', role: 'Pai da fé', emoji: '⭐' },
                { name: 'Sara', role: 'Mãe das nações', emoji: '👑' },
                { name: 'Isaac', role: 'Filho da promessa', emoji: '🐑' },
                { name: 'Jacó', role: 'Pai das 12 tribos', emoji: '🏔️' },
                { name: 'José', role: 'Governador do Egito', emoji: '👔' }
              ]
            },
            // ERA 2: ÊXODO E LEI
            { id: 'exodus', name: 'Êxodo', era: 'exodo', eraLabel: '🏜️ Êxodo e Lei', date: '~1446 a.C.', author: 'Moisés', chapters: 40, location: 'Egito, Sinai', description: 'Libertação do Egito e a Lei no Sinai', icon: '🌊',
              characters: [
                { name: 'Moisés', role: 'Libertador de Israel', emoji: '🧔‍♂️' },
                { name: 'Faraó', role: 'Rei do Egito', emoji: '👑' },
                { name: 'Arão', role: 'Sumo sacerdote', emoji: '🕯️' },
                { name: 'Miriam', role: 'Profetisa', emoji: '🎵' }
              ]
            },
            { id: 'leviticus', name: 'Levítico', era: 'exodo', eraLabel: '🏜️ Êxodo e Lei', date: '~1445 a.C.', author: 'Moisés', chapters: 27, location: 'Monte Sinai', description: 'Leis de santidade e adoração', icon: '🕯️',
              characters: [
                { name: 'Moisés', role: 'Mediador da Lei', emoji: '🧔‍♂️' },
                { name: 'Arão', role: 'Primeiro sumo sacerdote', emoji: '🕯️' }
              ]
            },
            { id: 'numbers', name: 'Números', era: 'exodo', eraLabel: '🏜️ Êxodo e Lei', date: '~1444-1405 a.C.', author: 'Moisés', chapters: 36, location: 'Sinai, Deserto, Moabe', description: 'Jornada de Israel pelo deserto', icon: '🏜️',
              characters: [
                { name: 'Moisés', role: 'Líder no deserto', emoji: '🧔‍♂️' },
                { name: 'Balaão', role: 'Profeta corrupto', emoji: '🫏' },
                { name: 'Josué', role: 'Sucessor de Moisés', emoji: '⚔️' },
                { name: 'Calebe', role: 'Espião fiel', emoji: '🍇' }
              ]
            },
            { id: 'deuteronomy', name: 'Deuteronômio', era: 'exodo', eraLabel: '🏜️ Êxodo e Lei', date: '~1406 a.C.', author: 'Moisés', chapters: 34, location: 'Plícies de Moabe', description: 'Últimas palavras de Moisés e renovação da aliança', icon: '📜',
              characters: [
                { name: 'Moisés', role: 'Despedida do líder', emoji: '🧔‍♂️' },
                { name: 'Josué', role: 'Novo líder nomeado', emoji: '⚔️' }
              ]
            },
            // ERA 3: CONQUISTA
            { id: 'joshua', name: 'Josué', era: 'conquista', eraLabel: '⚔️ Conquista', date: '~1405-1370 a.C.', author: 'Josué / Eleazar', chapters: 24, location: 'Canaã', description: 'Conquista e divisão da Terra Prometida', icon: '⚔️',
              characters: [
                { name: 'Josué', role: 'Líder militar', emoji: '⚔️' },
                { name: 'Raabe', role: 'Prostituta de Jericó', emoji: '🔴' },
                { name: 'Acã', role: 'Pecador no acampamento', emoji: '💰' }
              ]
            },
            { id: 'judges', name: 'Juízes', era: 'conquista', eraLabel: '⚔️ Conquista', date: '~1370-1050 a.C.', author: 'Possivelmente Samuel', chapters: 21, location: 'Israel', description: 'Ciclo de pecado, opressão e libertação', icon: '⚖️',
              characters: [
                { name: 'Sansão', role: 'Juiz forte', emoji: '💪' },
                { name: 'Débora', role: 'Profetisa e juíza', emoji: '🌴' },
                { name: 'Gideão', role: 'Guerreiro improvável', emoji: '🏺' },
                { name: 'Rute', role: 'Moabita fiel', emoji: '🌾' },
                { name: 'Samuel', role: 'Último juiz', emoji: '👦' }
              ]
            },
            { id: 'ruth', name: 'Rute', era: 'conquista', eraLabel: '⚔️ Conquista', date: '~1100 a.C.', author: 'Desconhecido', chapters: 4, location: 'Belém, Moabe', description: 'Amor, lealdade e redenção', icon: '🌾',
              characters: [
                { name: 'Rute', role: 'Moabita fiel', emoji: '🌾' },
                { name: 'Noemi', role: 'Sogra de Rute', emoji: '👵' },
                { name: 'Boaz', role: 'Parente remidor', emoji: '🌿' }
              ]
            },
            // ERA 4: REINO UNIDO
            { id: '1samuel', name: '1 Samuel', era: 'reino', eraLabel: '👑 Reino Unido', date: '~1100-1010 a.C.', author: 'Samuel, Natã, Gade', chapters: 31, location: 'Israel', description: 'Transição de juízes para reis', icon: '👑',
              characters: [
                { name: 'Samuel', role: 'Profeta e juiz', emoji: '👦' },
                { name: 'Saul', role: 'Primeiro rei', emoji: '🗡️' },
                { name: 'Davi', role: 'Rei segundo o coração de Deus', emoji: '🎵' },
                { name: 'Jônatas', role: 'Amigo de Davi', emoji: '🤝' }
              ]
            },
            { id: '2samuel', name: '2 Samuel', era: 'reino', eraLabel: '👑 Reino Unido', date: '~1010-970 a.C.', author: 'Natã, Gade', chapters: 24, location: 'Israel', description: 'Reinado de Davi', icon: '🎵',
              characters: [
                { name: 'Davi', role: 'Rei de Israel', emoji: '🎵' },
                { name: 'Bate-Seba', role: 'Esposa de Urias', emoji: '👩' },
                { name: 'Absalão', role: 'Filho rebelde', emoji: '💇' },
                { name: 'Natã', role: 'Profeta', emoji: '📢' }
              ]
            },
            { id: 'psalms', name: 'Salmos', era: 'reino', eraLabel: '👑 Reino Unido', date: '~1400-400 a.C.', author: 'Davi, Asafe, outros', chapters: 150, location: 'Israel', description: 'Cânticos de louvor, lamento e sabedoria', icon: '🎶',
              characters: [
                { name: 'Davi', role: 'Principal autor', emoji: '🎵' },
                { name: 'Asafe', role: 'Músico do templo', emoji: '🎼' },
                { name: 'Salomão', role: 'Rei sábio', emoji: '👑' }
              ]
            },
            { id: 'proverbs', name: 'Provérbios', era: 'reino', eraLabel: '👑 Reino Unido', date: '~950 a.C.', author: 'Salomão', chapters: 31, location: 'Israel', description: 'Sabedoria prática para o dia a dia', icon: '🦉',
              characters: [
                { name: 'Salomão', role: 'Rei mais sábio', emoji: '👑' }
              ]
            },
            { id: '1kings', name: '1 Reis', era: 'reino', eraLabel: '👑 Reino Unido', date: '~970-853 a.C.', author: 'Possivelmente Jeremias', chapters: 22, location: 'Israel', description: 'Reinado de Salomão e divisão do reino', icon: '🏛️',
              characters: [
                { name: 'Salomão', role: 'Rei sábio', emoji: '👑' },
                { name: 'Elias', role: 'Profeta de fogo', emoji: '🔥' },
                { name: 'Acabe', role: 'Rei ímpio', emoji: '😈' },
                { name: 'Jezabel', role: 'Rainha maligna', emoji: '💀' }
              ]
            },
            { id: '2kings', name: '2 Reis', era: 'reino', eraLabel: '👑 Reino Unido', date: '~853-586 a.C.', author: 'Possivelmente Jeremias', chapters: 25, location: 'Israel e Judá', description: 'História dos reis até o exílio', icon: '🏚️',
              characters: [
                { name: 'Eliseu', role: 'Profeta milagreiro', emoji: '✨' },
                { name: 'Ezequias', role: 'Rei piedoso', emoji: '🙏' },
                { name: 'Josias', role: 'Rei reformador', emoji: '📖' }
              ]
            },
            // ERA 5: REINO DIVIDIDO E PROFETAS
            { id: 'isaiah', name: 'Isaías', era: 'profetas', eraLabel: '📢 Profetas', date: '~740-680 a.C.', author: 'Isaías', chapters: 66, location: 'Judá', description: 'O evangelho do Antigo Testamento — Messias prometido', icon: '📢',
              characters: [
                { name: 'Isaías', role: 'Profeta messiânico', emoji: '📢' },
                { name: 'Ezequias', role: 'Rei de Judá', emoji: '🙏' }
              ]
            },
            { id: 'jeremiah', name: 'Jeremias', era: 'profetas', eraLabel: '📢 Profetas', date: '~627-585 a.C.', author: 'Jeremias', chapters: 52, location: 'Judá', description: 'O profeta chorão — alerta sobre o exílio', icon: '😢',
              characters: [
                { name: 'Jeremias', role: 'Profeta chorão', emoji: '😢' },
                { name: 'Baruc', role: 'Secretário', emoji: '✍️' }
              ]
            },
            { id: 'ezekiel', name: 'Ezequiel', era: 'profetas', eraLabel: '📢 Profetas', date: '~593-571 a.C.', author: 'Ezequiel', chapters: 48, location: 'Babilônia', description: 'Visões da glória de Deus e restauração', icon: '👁️',
              characters: [
                { name: 'Ezequiel', role: 'Profeta no exílio', emoji: '👁️' }
              ]
            },
            { id: 'daniel', name: 'Daniel', era: 'profetas', eraLabel: '📢 Profetas', date: '~605-536 a.C.', author: 'Daniel', chapters: 12, location: 'Babilônia, Pérsia', description: 'Fidelidade na Babilônia e visões do futuro', icon: '🦁',
              characters: [
                { name: 'Daniel', role: 'Profeta na Babilônia', emoji: '🦁' },
                { name: 'Sadraque', role: 'Amigo fiel', emoji: '🔥' },
                { name: 'Mesaque', role: 'Amigo fiel', emoji: '🔥' },
                { name: 'Abede-Nego', role: 'Amigo fiel', emoji: '🔥' }
              ]
            },
            // ERA 6: EXÍLIO E RETORNO
            { id: 'ezra', name: 'Esdras', era: 'retorno', eraLabel: '🏗️ Retorno e Restauração', date: '~538-457 a.C.', author: 'Esdras', chapters: 10, location: 'Babilônia, Jerusalém', description: 'Retorno do exílio e reconstrução do templo', icon: '🏗️',
              characters: [
                { name: 'Esdras', role: 'Escriba e sacerdote', emoji: '📖' },
                { name: 'Ciro', role: 'Rei da Pérsia', emoji: '👑' },
                { name: 'Zorobabel', role: 'Líder do retorno', emoji: '🏛️' }
              ]
            },
            { id: 'nehemiah', name: 'Neemias', era: 'retorno', eraLabel: '🏗️ Retorno e Restauração', date: '~445-420 a.C.', author: 'Neemias', chapters: 13, location: 'Jerusalém', description: 'Reconstrução dos muros de Jerusalém', icon: '🧱',
              characters: [
                { name: 'Neemias', role: 'Construtor dos muros', emoji: '🧱' },
                { name: 'Esdras', role: 'Líder espiritual', emoji: '📖' }
              ]
            },
            { id: 'esther', name: 'Ester', era: 'retorno', eraLabel: '🏗️ Retorno e Restauração', date: '~483-473 a.C.', author: 'Desconhecido', chapters: 10, location: 'Pérsia (Susa)', description: 'Providência de Deus — uma rainha corajosa', icon: '👸',
              characters: [
                { name: 'Ester', role: 'Rainha corajosa', emoji: '👸' },
                { name: 'Mardoqueu', role: 'Primo protetor', emoji: '🛡️' },
                { name: 'Hamã', role: 'Vilão', emoji: '😈' },
                { name: 'Assuero', role: 'Rei da Pérsia', emoji: '👑' }
              ]
            },
            // ERA 7: EVANGELHOS
            { id: 'matthew', name: 'Mateus', era: 'evangelhos', eraLabel: '✝️ Evangelhos', date: '~55-65 d.C.', author: 'Mateus (Levi)', chapters: 28, location: 'Israel', description: 'Jesus, o Rei prometido — Messias de Israel', icon: '👑',
              characters: [
                { name: 'Jesus', role: 'O Messias', emoji: '✝️' },
                { name: 'Pedro', role: 'Apóstolo líder', emoji: '🪨' },
                { name: 'Maria', role: 'Mãe de Jesus', emoji: '🌹' },
                { name: 'João Batista', role: 'Precursor', emoji: '🌊' }
              ]
            },
            { id: 'mark', name: 'Marcos', era: 'evangelhos', eraLabel: '✝️ Evangelhos', date: '~55-65 d.C.', author: 'João Marcos', chapters: 16, location: 'Israel', description: 'Jesus, o Servo sofredor — ação e milagres', icon: '🦁',
              characters: [
                { name: 'Jesus', role: 'O Servo', emoji: '✝️' },
                { name: 'Pedro', role: 'Apóstolo', emoji: '🪨' }
              ]
            },
            { id: 'luke', name: 'Lucas', era: 'evangelhos', eraLabel: '✝️ Evangelhos', date: '~60-62 d.C.', author: 'Lucas (médico)', chapters: 24, location: 'Israel, Mediterrâneo', description: 'Jesus, o Filho do Homem — compaixão e salvação', icon: '❤️',
              characters: [
                { name: 'Jesus', role: 'Filho do Homem', emoji: '✝️' },
                { name: 'Maria', role: 'Mãe de Jesus', emoji: '🌹' },
                { name: 'Zacarias', role: 'Pai de João', emoji: '🕯️' },
                { name: 'Isabel', role: 'Mãe de João', emoji: '👵' }
              ]
            },
            { id: 'john', name: 'João', era: 'evangelhos', eraLabel: '✝️ Evangelhos', date: '~85-90 d.C.', author: 'João (apóstolo)', chapters: 21, location: 'Éfeso / Israel', description: 'Jesus, o Filho de Deus — divindade e vida eterna', icon: '🦅',
              characters: [
                { name: 'Jesus', role: 'Filho de Deus', emoji: '✝️' },
                { name: 'João', role: 'Apóstolo do amor', emoji: '🦅' },
                { name: 'Lázaro', role: 'Ressuscitado', emoji: '⚰️' },
                { name: 'Nicodemos', role: 'Fariseu curioso', emoji: '🌙' }
              ]
            },
            // ERA 8: IGREJA PRIMITIVA
            { id: 'acts', name: 'Atos dos Apóstolos', era: 'igreja', eraLabel: '🔥 Igreja Primitiva', date: '~63 d.C.', author: 'Lucas', chapters: 28, location: 'Jerusalém → Roma', description: 'Expansão da igreja pelo poder do Espírito Santo', icon: '🔥',
              characters: [
                { name: 'Pedro', role: 'Líder da igreja', emoji: '🪨' },
                { name: 'Paulo', role: 'Apóstolo dos gentios', emoji: '✉️' },
                { name: 'Barnabé', role: 'Encorajador', emoji: '🤗' },
                { name: 'Silas', role: 'Companheiro de Paulo', emoji: '🤝' }
              ]
            },
            { id: 'romans', name: 'Romanos', era: 'igreja', eraLabel: '🔥 Igreja Primitiva', date: '~57 d.C.', author: 'Paulo', chapters: 16, location: 'Roma', description: 'A justiça de Deus pela fé — teologia profunda', icon: '⚖️',
              characters: [
                { name: 'Paulo', role: 'Apóstolo dos gentios', emoji: '✉️' }
              ]
            },
            { id: '1corinthians', name: '1 Coríntios', era: 'igreja', eraLabel: '🔥 Igreja Primitiva', date: '~55 d.C.', author: 'Paulo', chapters: 16, location: 'Éfeso → Corinto', description: 'Correção de problemas na igreja', icon: '💌',
              characters: [
                { name: 'Paulo', role: 'Fundador da igreja', emoji: '✉️' }
              ]
            },
            { id: 'revelation', name: 'Apocalipse', era: 'igreja', eraLabel: '🔥 Igreja Primitiva', date: '~95 d.C.', author: 'João (apóstolo)', chapters: 22, location: 'Ilha de Patmos', description: 'Visão do fim dos tempos e vitória final de Cristo', icon: '🌟',
              characters: [
                { name: 'Jesus', role: 'Alfa e Ômega', emoji: '✝️' },
                { name: 'João', role: 'Visionário', emoji: '🦅' }
              ]
            }
        ],

        // Sample Bible text (key chapters)
        texts: {
            'genesis-1': {
                title: 'Gênesis 1 — A Criação',
                verses: [
                    { n: 1, text: 'No princípio criou Deus os céus e a terra.' },
                    { n: 2, text: 'E a terra era sem forma e vazia; e havia trevas sobre a face do abismo; e o Espírito de Deus se movia sobre a face das águas.' },
                    { n: 3, text: 'E disse Deus: Haja luz. E houve luz.' },
                    { n: 4, text: 'E viu Deus que a luz era boa; e fez Deus separação entre a luz e as trevas.' },
                    { n: 5, text: 'E Deus chamou à luz Dia; e às trevas chamou Noite. E foi a tarde e a manhã, o dia primeiro.' },
                    { n: 6, text: 'E disse Deus: Haja uma expansão no meio das águas, e haja separação entre águas e águas.' },
                    { n: 7, text: 'E fez Deus a expansão, e fez separação entre as águas que estavam debaixo da expansão e as águas que estavam por cima da expansão. E assim foi.' },
                    { n: 8, text: 'E chamou Deus à expansão Céus. E foi a tarde e a manhã, o dia segundo.' },
                    { n: 9, text: 'E disse Deus: Ajuntem-se as águas debaixo dos céus num lugar; e apareça a porção seca. E assim foi.' },
                    { n: 10, text: 'E chamou Deus à porção seca Terra; e ao ajuntamento das águas chamou Mares. E viu Deus que era bom.' },
                    { n: 11, text: 'E disse Deus: Produza a terra erva verde, erva que dê semente, árvore frutífera que dê fruto segundo a sua espécie, cuja semente está nela sobre a terra. E assim foi.' },
                    { n: 12, text: 'E a terra produziu erva, erva dando semente conforme a sua espécie, e árvore que dá fruto, cuja semente está nela, conforme a sua espécie. E viu Deus que era bom.' },
                    { n: 13, text: 'E foi a tarde e a manhã, o dia terceiro.' },
                    { n: 14, text: 'E disse Deus: Haja luminares na expansão dos céus, para haver separação entre o dia e a noite; e sejam eles para sinais e para tempos determinados e para dias e anos.' },
                    { n: 15, text: 'E sejam para luminares na expansão dos céus, para alumiar a terra. E assim foi.' },
                    { n: 16, text: 'E fez Deus os dois grandes luminares: o luminar maior para governar o dia, e o luminar menor para governar a noite; e fez as estrelas.' },
                    { n: 17, text: 'E Deus os pôs na expansão dos céus para alumiar a terra.' },
                    { n: 18, text: 'E para governar o dia e a noite, e para fazer separação entre a luz e as trevas. E viu Deus que era bom.' },
                    { n: 19, text: 'E foi a tarde e a manhã, o dia quarto.' },
                    { n: 20, text: 'E disse Deus: Produzam as águas abundantemente répteis de alma vivente; e voem as aves sobre a face da expansão dos céus.' },
                    { n: 21, text: 'E Deus criou as grandes baleias, e todo réptil de alma vivente que as águas abundantemente produziram conforme as suas espécies; e toda ave alada conforme a sua espécie. E viu Deus que era bom.' },
                    { n: 22, text: 'E Deus os abençoou, dizendo: Frutificai e multiplicai-vos, e enchei as águas nos mares; e as aves se multipliquem na terra.' },
                    { n: 23, text: 'E foi a tarde e a manhã, o dia quinto.' },
                    { n: 24, text: 'E disse Deus: Produza a terra alma vivente conforme a sua espécie; gado, e répteis, e bestas-feras da terra conforme a sua espécie. E assim foi.' },
                    { n: 25, text: 'E fez Deus as bestas-feras da terra conforme a sua espécie, e o gado conforme a sua espécie, e todo o réptil sobre a terra conforme a sua espécie. E viu Deus que era bom.' },
                    { n: 26, text: 'E disse Deus: Façamos o homem à nossa imagem, conforme a nossa semelhança; e domine sobre os peixes do mar, e sobre as aves dos céus, e sobre o gado, e sobre toda a terra, e sobre todo réptil que se move sobre a terra.' },
                    { n: 27, text: 'E criou Deus o homem à sua imagem; à imagem de Deus o criou; macho e fêmea os criou.' },
                    { n: 28, text: 'E Deus os abençoou, e Deus lhes disse: Frutificai e multiplicai-vos, e enchei a terra, e sujeitai-a; e dominai sobre os peixes do mar e sobre as aves dos céus, e sobre todo o animal que se move sobre a terra.' },
                    { n: 29, text: 'E disse Deus: Eis que vos tenho dado toda erva que dê semente, que está sobre a face de toda a terra, e toda árvore em que há fruto de árvore que dê semente; ser-vos-ão para mantimento.' },
                    { n: 30, text: 'E a todo animal da terra, e a toda ave dos céus, e a todo réptil da terra, em que há alma vivente, toda a erva verde lhes será para mantimento. E assim foi.' },
                    { n: 31, text: 'E viu Deus tudo quanto tinha feito, e eis que era muito bom. E foi a tarde e a manhã, o dia sexto.' }
                ]
            },
            'genesis-2': {
                title: 'Gênesis 2 — O Jardim do Éden',
                verses: [
                    { n: 1, text: 'Assim os céus, a terra e todo o seu exército foram acabados.' },
                    { n: 2, text: 'E havendo Deus completado no dia sétimo a sua obra, que tinha feito, descansou nesse dia de toda a sua obra que tinha feito.' },
                    { n: 3, text: 'E abençoou Deus o dia sétimo e o santificou; porque nele descansou de toda a obra que Deus criara e fizera.' },
                    { n: 4, text: 'Esta é a geração dos céus e da terra, quando foram criados, no dia em que o Senhor Deus fez a terra e os céus.' },
                    { n: 7, text: 'E formou o Senhor Deus o homem do pó da terra, e soprou-lhe nas narinas o fôlego de vida; e o homem foi feito alma vivente.' },
                    { n: 8, text: 'E plantou o Senhor Deus um jardim no Éden, da banda do oriente, e pôs ali o homem que tinha formado.' },
                    { n: 9, text: 'E o Senhor Deus fez brotar da terra toda árvore agradável à vista e boa para alimento; e a árvore da vida no meio do jardim, e a árvore do conhecimento do bem e do mal.' },
                    { n: 15, text: 'E tomou o Senhor Deus o homem, e o pôs no jardim do Éden para lavrar e guardar.' },
                    { n: 16, text: 'E ordenou o Senhor Deus ao homem, dizendo: De toda árvore do jardim comerás livremente.' },
                    { n: 17, text: 'Mas da árvore do conhecimento do bem e do mal, dela não comerás; porque no dia em que dela comeres, certamente morrerás.' },
                    { n: 18, text: 'E disse o Senhor Deus: Não é bom que o homem esteja só; far-lhe-ei uma auxiliadora que lhe seja idônea.' },
                    { n: 21, text: 'Então o Senhor Deus fez cair um sono pesado sobre o homem, e este adormeceu; e tomou uma das suas costelas, e cerrou a carne em seu lugar.' },
                    { n: 22, text: 'E da costela que o Senhor Deus tinha tirado do homem, formou uma mulher; e trouxe-a ao homem.' },
                    { n: 23, text: 'E disse o homem: Esta é agora osso dos meus ossos, e carne da minha carne; esta será chamada mulher, porquanto do homem foi tomada.' },
                    { n: 24, text: 'Portanto deixará o homem o seu pai e a sua mãe, e apegar-se-á à sua mulher, e serão uma só carne.' },
                    { n: 25, text: 'E ambos estavam nus, o homem e a sua mulher; e não se envergonhavam.' }
                ]
            },
            'exodus-1': {
                title: 'Êxodo 1 — Israel no Egito',
                verses: [
                    { n: 1, text: 'Estes são os nomes dos filhos de Israel que entraram no Egito; com Jacó entraram, cada um com a sua família:' },
                    { n: 2, text: 'Rúben, Simeão, Levi e Judá;' },
                    { n: 3, text: 'Issacar, Zebulom e Benjamim;' },
                    { n: 4, text: 'Dã e Naftali, Gade e Aser.' },
                    { n: 5, text: 'Todas as almas, pois, que procederam da coxa de Jacó, foram setenta; José, porém, já estava no Egito.' },
                    { n: 6, text: 'Então morreu José, e todos os seus irmãos, e toda aquela geração.' },
                    { n: 7, text: 'Mas os filhos de Israel frutificaram, e aumentaram muito, e se multiplicaram, tornando-se extremamente fortes; de modo que a terra se encheu deles.' },
                    { n: 8, text: 'Depois se levantou um novo rei sobre o Egito, que não conhecera a José.' },
                    { n: 9, text: 'E disse ao seu povo: Eis que o povo dos filhos de Israel é mais muito e mais poderoso do que nós.' },
                    { n: 10, text: 'Eia, usemos de astúcia para com ele, para que não se multiplique, e aconteça que, vindo guerra, ele também se ajunte com os nossos inimigos, e peleje contra nós, e suba da terra.' },
                    { n: 11, text: 'Portanto puseram sobre eles maiorais de tributos, para os afligirem com suas cargas. Pois edificaram a Faraó cidades-armazéns, Pitom e Ramessés.' },
                    { n: 14, text: 'Assim fizeram os egípcios que os filhos de Israel servissem com dureza.' },
                    { n: 15, text: 'Depois o rei do Egito falou às parteiras das hebréias, das quais uma se chamava Sifrá e a outra Puá,' },
                    { n: 22, text: 'Então ordenou Faraó a todo o seu povo, dizendo: A todo filho que nascer lançareis no rio, mas a toda filha guardareis.' }
                ]
            },
            'john-1': {
                title: 'João 1 — O Verbo Encarnado',
                verses: [
                    { n: 1, text: 'No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.' },
                    { n: 2, text: 'Ele estava no princípio com Deus.' },
                    { n: 3, text: 'Todas as coisas foram feitas por intermédio dele, e sem ele nada do que foi feito se fez.' },
                    { n: 4, text: 'Nele estava a vida, e a vida era a luz dos homens.' },
                    { n: 5, text: 'A luz resplandece nas trevas, e as trevas não prevaleceram contra ela.' },
                    { n: 6, text: 'Houve um homem enviado de Deus, cujo nome era João.' },
                    { n: 7, text: 'Este veio para testemunho, para que testificasse da luz, a fim de que todos cressem por meio dele.' },
                    { n: 8, text: 'Ele não era a luz, mas veio para que testificasse da luz.' },
                    { n: 9, text: 'A verdadeira luz, que alumia a todo homem, estava chegando ao mundo.' },
                    { n: 10, text: 'Estava no mundo, e o mundo foi feito por intermédio dele, e o mundo não o conheceu.' },
                    { n: 11, text: 'Veio para o que era seu, e os seus não o receberam.' },
                    { n: 12, text: 'Mas, a todos quantos o receberam, deu-lhes o poder de serem feitos filhos de Deus: a saber, aos que creem no seu nome;' },
                    { n: 13, text: 'os quais não nasceram do sangue, nem da vontade da carne, nem da vontade do varão, mas de Deus.' },
                    { n: 14, text: 'E o Verbo se fez carne, e habitou entre nós, cheio de graça e de verdade; e vimos a sua glória, como a glória do unigênito do Pai.' },
                    { n: 15, text: 'João testificou dele, e clamou, dizendo: Este é aquele de quem eu disse: O que vem depois de mim passou adiante de mim, porque já existia antes de mim.' },
                    { n: 16, text: 'Pois todos nós recebemos também da sua plenitude, e graça sobre graça.' },
                    { n: 17, text: 'Porque a lei foi dada por intermédio de Moisés; a graça e a verdade vieram por intermédio de Jesus Cristo.' },
                    { n: 18, text: 'Ninguém jamais viu a Deus; o unigênito Filho, que está no seio do Pai, esse o revelou.' }
                ]
            },
            'psalms-23': {
                title: 'Salmos 23 — O Senhor é Meu Pastor',
                verses: [
                    { n: 1, text: 'O Senhor é o meu pastor; nada me faltará.' },
                    { n: 2, text: 'Deitar-me faz em pastos verdejantes; guia-me mansamente a águas tranquilas.' },
                    { n: 3, text: 'Refrigera a minha alma; guia-me pelas veredas da justiça por amor do seu nome.' },
                    { n: 4, text: 'Ainda que eu ande pelo vale da sombra da morte, não temerei mal algum, porque tu estás comigo; a tua vara e o teu cajado me consolam.' },
                    { n: 5, text: 'Preparas uma mesa perante mim na presença dos meus inimigos; unges a minha cabeça com óleo, o meu cálice transborda.' },
                    { n: 6, text: 'Certamente que o bem e a misericórdia me seguirão todos os dias da minha vida, e habitarei na casa do Senhor por longos dias.' }
                ]
            },
            'revelation-1': {
                title: 'Apocalipse 1 — A Revelação de Jesus Cristo',
                verses: [
                    { n: 1, text: 'Revelação de Jesus Cristo, que Deus lhe deu para mostrar aos seus servos as coisas que brevemente devem acontecer, e que ele, enviando por anjo ao seu servo João, as notificou;' },
                    { n: 2, text: 'o qual testificou da palavra de Deus, e do testemunho de Jesus Cristo, e de tudo o que viu.' },
                    { n: 3, text: 'Bem-aventurado aquele que lê, e os que ouvem as palavras desta profecia, e guardam as coisas que nela estão escritas; porque o tempo está próximo.' },
                    { n: 4, text: 'João, às sete igrejas que estão na Ásia: Graça a vós, e paz, da parte daquele que é, e que era, e que há de vir, e dos sete espíritos que estão diante do seu trono;' },
                    { n: 5, text: 'e da parte de Jesus Cristo, que é a fiel testemunha, o primogênito dos mortos e o príncipe dos reis da terra. Àquele que nos ama, e pelo seu sangue nos lavou dos nossos pecados,' },
                    { n: 6, text: 'e nos fez reino, sacerdotes para seu Deus e Pai; a ele seja a glória e o domínio para todo o sempre. Amém.' },
                    { n: 7, text: 'Eis que vem com as nuvens, e todo olho o verá, até os que o traspassaram; e todas as tribos da terra se lamentarão sobre ele. Sim! Amém.' },
                    { n: 8, text: 'Eu sou o Alfa e o Ômega, diz o Senhor Deus, aquele que é, e que era, e que há de vir, o Todo-Poderoso.' }
                ]
            }
        },

        // Dictionary
        dictionary: {
            'princípio': { original: 'רֵאשִׁית (reshit)', type: 'Hebraico', meaning: 'Início, começo, primeira causa. Indica o ponto inicial da criação. Na teologia, aponta para a eternidade de Deus que existia antes do tempo.' },
            'criou': { original: 'בָּרָא (bara)', type: 'Hebraico', meaning: 'Criar do nada (creatio ex nihilo). Este verbo é usado exclusivamente para a criação divina — somente Deus pode criar do nada.' },
            'Deus': { original: 'אֱלֹהִים (Elohim)', type: 'Hebraico', meaning: 'O termo é plural, sugerindo a Trindade. Indica o Deus todo-poderoso, Criador e Juiz. É o nome que enfatiza o poder e a majestade divina.' },
            'céus': { original: 'שָׁמַיִם (shamayim)', type: 'Hebraico', meaning: 'Plural de "céu". Refere-se ao universo inteiro — o espaço, a atmosfera e a habitação de Deus. Abrange tudo que existe além da terra.' },
            'terra': { original: 'אֶרֶץ (erets)', type: 'Hebraico', meaning: 'O planeta, o solo, a terra habitável. No contexto da criação, refere-se ao planeta Terra como morada preparada para a vida.' },
            'luz': { original: 'אוֹר (or)', type: 'Hebraico', meaning: 'Luz, brilho, iluminação. Simbolicamente representa Deus, verdade, vida e salvação. A primeira coisa criada demonstra que Deus é luz (1Jo 1:5).' },
            'trevas': { original: 'חֹשֶׁךְ (choshekh)', type: 'Hebraico', meaning: 'Escuridão, ausência de luz. Representa ignorância, mal e separação de Deus. Não foi criada — é a ausência da luz de Deus.' },
            'Espírito': { original: 'רוּחַ (ruach)', type: 'Hebraico', meaning: 'Sopro, vento, espírito. O Espírito Santo de Deus — a terceira pessoa da Trindade — estava presente e ativo na criação.' },
            'água': { original: 'מַיִם (mayim)', type: 'Hebraico', meaning: 'Águas. Elemento essencial para a vida. Na Bíblia, simboliza purificação, vida e também o caos primordial que Deus ordenou.' },
            'homem': { original: 'אָדָם (adam)', type: 'Hebraico', meaning: 'Seres humanos, humanidade. Vem de "adamah" (terra/ solo), pois foi formado do pó. Representa toda a raça humana criada à imagem de Deus.' },
            'alma': { original: 'נֶפֶשׁ (nephesh)', type: 'Hebraico', meaning: 'Ser vivente, vida, pessoa. Indica a vida consciente e pessoal. O homem não TEM uma alma — ele É uma alma vivente.' },
            'bom': { original: 'טוֹב (tov)', type: 'Hebraico', meaning: 'Bom, belo, agradável, perfeito. Cada ato criativo de Deus é declarado bom — refletindo Sua perfeição e propósito.' },
            'Verbo': { original: 'Λόγος (Logos)', type: 'Grego', meaning: 'Palavra, razão, expressão. Em João 1, refere-se a Jesus Cristo — a Palavra eterna de Deus que se fez carne. É a comunicação perfeita de Deus à humanidade.' },
            'vida': { original: 'ζωή (zoe)', type: 'Grego', meaning: 'Vida no sentido absoluto e divino — não apenas existência biológica (bios), mas a vida eterna e plena que vem de Deus.' },
            'glória': { original: 'כָּבוֹד (kavod) / δόξα (doxa)', type: 'Hebraico/Grego', meaning: 'Peso, honra, majestade, esplendor. A manifestação visível da presença e perfeição de Deus. No AT, "peso" (algo substancial); no NT, "brilho" divino.' },
            'graça': { original: 'חֶסֶד (chesed) / χάρις (charis)', type: 'Hebraico/Grego', meaning: 'Favor imerecido, amor leal, bondade gratuita. No AT, o amor fiel de Deus à aliança; no NT, o presente gratuito da salvação em Cristo.' },
            'verdade': { original: 'אֱמֶת (emet) / ἀλήθεια (aletheia)', type: 'Hebraico/Grego', meaning: 'Firmeza, fidelidade, realidade. No hebraico, "firme, confiável"; no grego, "realidade não oculta". Jesus É a verdade (Jo 14:6).' },
            'pastor': { original: 'רֹעֶה (roeh)', type: 'Hebraico', meaning: 'Aquele que apascenta, cuida, protege. Metáfora central da Bíblia — Deus como pastor cuida, guia e protege Seu povo com ternura.' },
            'justiça': { original: 'צֶדֶק (tsedeq) / δικαιοσύνη (dikaiosune)', type: 'Hebraico/Grego', meaning: 'Retidão, correção, conformidade com o caráter de Deus. Não é apenas seguir regras, mas viver em alinhamento com a natureza santa de Deus.' },
            'fé': { original: 'πίστις (pistis)', type: 'Grego', meaning: 'Confiança, fidelidade, convicção. Em Hb 11:1: "certeza de coisas que se esperam, convicção de fatos que se não veem". É confiar plenamente em Deus.' },
            'amor': { original: 'ἀγάπη (agape) / אהבה (ahavah)', type: 'Grego/Hebraico', meaning: 'Amor incondicional e sacrificial. Diferente de eros (romântico) e philia (amizade), o agape é o amor que Deus tem — que dá sem esperar retorno.' },
            'salvação': { original: 'יְשׁוּעָה (yeshuah) / σωτηρία (soteria)', type: 'Hebraico/Grego', meaning: 'Livramento, resgate, libertação. O próprio nome de Jesus é "Yeshuah" = "Salvação". Deus liberta do pecado, morte e condenação.' },
            'pecado': { original: 'חַטָּאת (chattat) / ἁμαρτία (hamartia)', type: 'Hebraico/Grego', meaning: '"Errar o alvo" — como flecha que não atinge a mira. É falhar em cumprir o propósito de Deus, desobedecer Sua lei, separar-se Dele.' },
            'aliança': { original: 'בְּרִית (berit) / διαθήκη (diatheke)', type: 'Hebraico/Grego', meaning: 'Pacto, acordo vinculante. Um compromisso sagrado entre Deus e Seu povo. As alianças bíblicas incluem: Noé, Abraão, Moisés, Davi e a Nova Aliança em Cristo.' },
            'profeta': { original: 'נָבִיא (navi) / προφήτης (prophetes)', type: 'Hebraico/Grego', meaning: '"Aquele que fala por outro" — porta-voz de Deus. Não apenas prediz o futuro, mas declara a mensagem de Deus ao povo.' },
            'rei': { original: 'מֶלֶךְ (melekh) / βασιλεύς (basileus)', type: 'Hebraico/Grego', meaning: 'Governante, soberano. Na Bíblia, o rei ideal governa com justiça sob a autoridade de Deus. Jesus é o "Rei dos reis".' },
            'oração': { original: 'תְּפִלָּה (tefillah) / προσευχή (proseuche)', type: 'Hebraico/Grego', meaning: 'Comunicação direta com Deus — pedir, louvar, confessar, interceder. É o respirar da alma — relacionamento pessoal com o Criador.' },
            'ressurreição': { original: 'ἀνάστασις (anastasis)', type: 'Grego', meaning: '"Levantar-se" — voltar à vida após a morte. Central ao cristianismo: Cristo ressuscitou e garante a ressurreição dos crentes (1Co 15).' },
            'sabedoria': { original: 'חָכְמָה (chokmah) / σοφία (sophia)', type: 'Hebraico/Grego', meaning: 'Habilidade prática de viver bem. Não é apenas conhecimento, mas aplicação correta. "O temor do Senhor é o princípio da sabedoria" (Pv 9:10).' },
            'redenção': { original: 'גְּאֻלָּה (geulah) / ἀπολύτρωσις (apolytrosis)', type: 'Hebraico/Grego', meaning: 'Resgate, libertação pelo pagamento de preço. Como um escravo comprado de volta. Cristo nos redimiu com Seu sangue (Ef 1:7).' },
            'santidade': { original: 'קֹדֶשׁ (qodesh) / ἁγιωσύνη (hagiosune)', type: 'Hebraico/Grego', meaning: 'Separado, puro, distinto. Atributo central de Deus — Ele é "Santo, Santo, Santo" (Is 6:3). Totalmente separado do pecado.' },
            'misericórdia': { original: 'רַחֲמִים (rachamim) / ἔλεος (eleos)', type: 'Hebraico/Grego', meaning: 'Compaixão profunda, ternura. Vem de "rechem" (ventre/útero) — o amor visceral de Deus. Não receber o castigo que merecemos.' },
            'juízo': { original: 'מִשְׁפָּט (mishpat) / κρίσις (krisis)', type: 'Hebraico/Grego', meaning: 'Julgamento, decisão justa. Deus é o Juiz justo de toda a terra. Haverá julgamento final de todos os homens (Hb 9:27).' }
        },

        // Timeline events
        timeline: [
            { date: '~4000 a.C.', title: 'Criação do Universo', desc: 'Deus cria os céus, a terra e toda a vida', book: 'genesis', icon: '🌅' },
            { date: '~2400 a.C.', title: 'O Dilúvio', desc: 'Noé constrói a arca; Deus julga a terra', book: 'genesis', icon: '🌊' },
            { date: '~2100 a.C.', title: 'Vida de Jó', desc: 'O mais antigo livro — provação e fé', book: 'job', icon: '🔥' },
            { date: '~2000 a.C.', title: 'Chamado de Abraão', desc: 'Deus promete uma nação e bênção universal', book: 'genesis', icon: '⭐' },
            { date: '~1876 a.C.', title: 'José no Egito', desc: 'De escravo a governador — providência divina', book: 'genesis', icon: '👔' },
            { date: '~1446 a.C.', title: 'Êxodo do Egito', desc: 'Moisés liberta Israel; Deus abre o Mar Vermelho', book: 'exodus', icon: '🌊' },
            { date: '~1445 a.C.', title: 'Lei no Sinai', desc: 'Deus dá os Dez Mandamentos a Moisés', book: 'exodus', icon: '📜' },
            { date: '~1406 a.C.', title: 'Morte de Moisés', desc: 'Josué assume a liderança de Israel', book: 'deuteronomy', icon: '🏔️' },
            { date: '~1405 a.C.', title: 'Conquista de Canaã', desc: 'Josué lidera a conquista da Terra Prometida', book: 'joshua', icon: '⚔️' },
            { date: '~1370-1050 a.C.', title: 'Período dos Juízes', desc: 'Ciclo de pecado e libertação', book: 'judges', icon: '⚖️' },
            { date: '~1100 a.C.', title: 'História de Rute', desc: 'Lealdade e redenção em Belém', book: 'ruth', icon: '🌾' },
            { date: '~1050 a.C.', title: 'Saul — Primeiro Rei', desc: 'Israel pede um rei como as nações', book: '1samuel', icon: '👑' },
            { date: '~1010 a.C.', title: 'Rei Davi', desc: 'O homem segundo o coração de Deus', book: '2samuel', icon: '🎵' },
            { date: '~970 a.C.', title: 'Rei Salomão', desc: 'O rei mais sábio — constrói o Templo', book: '1kings', icon: '🏛️' },
            { date: '~930 a.C.', title: 'Reino Dividido', desc: 'Israel (norte) e Judá (sul)', book: '1kings', icon: '💔' },
            { date: '~870 a.C.', title: 'Profeta Elias', desc: 'Confronto com os profetas de Baal', book: '1kings', icon: '🔥' },
            { date: '~740-680 a.C.', title: 'Profeta Isaías', desc: 'Profecias messiânicas — o Servo Sofredor', book: 'isaiah', icon: '📢' },
            { date: '~605 a.C.', title: 'Exílio na Babilônia', desc: 'Jerusalém destruída; Daniel na corte', book: 'daniel', icon: '🦁' },
            { date: '~538 a.C.', title: 'Retorno do Exílio', desc: 'Ciro permite a volta; Templo reconstruído', book: 'ezra', icon: '🏗️' },
            { date: '~445 a.C.', title: 'Muros Reconstruídos', desc: 'Neemias lidera a reconstrução', book: 'nehemiah', icon: '🧱' },
            { date: '~483 a.C.', title: 'Rainha Ester', desc: 'Providência divina na Pérsia', book: 'esther', icon: '👸' },
            { date: '~4 a.C.', title: 'Nascimento de Jesus', desc: 'O Verbo se faz carne — Deus conosco', book: 'luke', icon: '⭐' },
            { date: '~27-30 d.C.', title: 'Ministério de Jesus', desc: '3 anos de ensino, milagres e amor', book: 'matthew', icon: '✝️' },
            { date: '~30 d.C.', title: 'Morte e Ressurreição', desc: 'Cristo morre e ressuscita — salvação para todos', book: 'john', icon: '✝️' },
            { date: '~30 d.C.', title: 'Pentecostes', desc: 'O Espírito Santo desce — nasce a Igreja', book: 'acts', icon: '🔥' },
            { date: '~49-62 d.C.', title: 'Viagens de Paulo', desc: 'O evangelho se espalha pelo Império Romano', book: 'acts', icon: '✉️' },
            { date: '~57 d.C.', title: 'Carta aos Romanos', desc: 'Paulo escreve a maior exposição teológica', book: 'romans', icon: '⚖️' },
            { date: '~95 d.C.', title: 'Apocalipse', desc: 'João recebe a visão do fim e da eternidade', book: 'revelation', icon: '🌟' }
        ],

        // YouTube videos
        videos: [
            { title: 'A Criação — Gênesis Explicado', id: 'qDVHGM24CPc', desc: 'Entenda os 7 dias da criação' },
            { title: 'O Êxodo — História Completa', id: 'YCGFEGMjB8c', desc: 'A libertação de Israel do Egito' },
            { title: 'A Vida de Davi', id: 'R5_J-7WxJiE', desc: 'De pastor a rei de Israel' },
            { title: 'Jesus — O Evangelho', id: 'bC8_2kx1Fmk', desc: 'A vida e ministério de Cristo' },
            { title: 'Apocalipse Explicado', id: 'GNe4kqLmhJI', desc: 'O livro do fim dos tempos' },
            { title: 'Mapas Bíblicos — Terras da Bíblia', id: 'KQrM5bJnRQg', desc: 'Geografia das terras bíblicas' }
        ],

        // Maps
        maps: [
            { title: 'Israel e Terras Bíblicas', lat: 31.7683, lng: 35.2137, zoom: 8, desc: 'Jerusalém e região central' },
            { title: 'Egito — Terra da Escravidão', lat: 29.9792, lng: 31.1342, zoom: 6, desc: 'O Egito dos faraós' },
            { title: 'Mesopotâmia — Berço da Civilização', lat: 33.3128, lng: 44.3615, zoom: 6, desc: 'Onde Abraão nasceu' },
            { title: 'Monte Sinai — A Lei', lat: 28.5394, lng: 33.9753, zoom: 10, desc: 'Onde Moisés recebeu os Dez Mandamentos' },
            { title: 'Mar da Galileia — Ministério de Jesus', lat: 32.8256, lng: 35.5758, zoom: 11, desc: 'Onde Jesus andou sobre as águas' },
            { title: 'Roma — Centro do Império', lat: 41.9028, lng: 12.4964, zoom: 6, desc: 'Para onde Paulo foi enviado' }
        ]
    };

    // ===== STATE =====
    let state = {
        currentBook: 'genesis',
        currentChapter: 1,
        readChapters: {},  // { 'genesis-1': true, 'genesis-2': true, ... }
        activeTab: 'reading'
    };

    // Load state from localStorage
    function loadState() {
        const saved = localStorage.getItem('bibleAppState');
        if (saved) {
            const parsed = JSON.parse(saved);
            state = { ...state, ...parsed };
        }
    }

    function saveState() {
        localStorage.setItem('bibleAppState', JSON.stringify({
            currentBook: state.currentBook,
            currentChapter: state.currentChapter,
            readChapters: state.readChapters
        }));
    }

    // ===== INITIALIZATION =====
    loadState();

    // ===== FUNCTIONS =====

    function getBook(id) {
        return bibleData.books.find(b => b.id === id);
    }

    function getTotalChapters() {
        return bibleData.books.reduce((sum, b) => sum + b.chapters, 0);
    }

    function getReadCount() {
        return Object.keys(state.readChapters).length;
    }

    function getProgressPercent() {
        return Math.round((getReadCount() / getTotalChapters()) * 100);
    }

    function getProgressColor(percent) {
        if (percent < 25) return 'linear-gradient(90deg, #EF4444, #F59E0B)';
        if (percent < 50) return 'linear-gradient(90deg, #F59E0B, #FBBF24)';
        if (percent < 75) return 'linear-gradient(90deg, #3B82F6, #6C3CE1)';
        return 'linear-gradient(90deg, #10B981, #34D399)';
    }

    function updateGlobalProgress() {
        const percent = getProgressPercent();
        document.getElementById('globalPercent').textContent = percent + '%';
        const bar = document.getElementById('globalProgressBar');
        bar.style.width = percent + '%';
        bar.style.background = getProgressColor(percent);
    }

    function renderSidebar() {
        const container = document.getElementById('sidebarBooks');
        let html = '';
        let currentEra = '';

        const searchTerm = document.getElementById('bookSearch').value.toLowerCase();

        bibleData.books.forEach(book => {
            if (searchTerm && !book.name.toLowerCase().includes(searchTerm)) return;

            if (book.eraLabel !== currentEra) {
                currentEra = book.eraLabel;
                html += `<div class="era-group"><div class="era-label">${currentEra}</div>`;
            }

            const isActive = book.id === state.currentBook;
            const bookReadChapters = Object.keys(state.readChapters).filter(k => k.startsWith(book.id + '-')).length;
            const bookPercent = Math.round((bookReadChapters / book.chapters) * 100);
            const isCompleted = bookPercent === 100;

            html += `
                <div class="book-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}" 
                     onclick="selectBook('${book.id}')">
                    <span>${book.icon} ${book.name}</span>
                    <div class="book-progress-mini">
                        <div class="book-progress-mini-fill" style="width: ${bookPercent}%"></div>
                    </div>
                </div>
            `;
        });

        html += '</div>';
        container.innerHTML = html;
    }

    function selectBook(bookId) {
        state.currentBook = bookId;
        state.currentChapter = 1;
        saveState();
        renderSidebar();
        renderReadingView();
    }

    function renderChapterSelector() {
        const book = getBook(state.currentBook);
        const container = document.getElementById('chapterSelector');
        let html = '';

        for (let i = 1; i <= book.chapters; i++) {
            const key = `${book.id}-${i}`;
            const isRead = state.readChapters[key];
            const isActive = i === state.currentChapter;

            html += `<button class="chapter-btn ${isActive ? 'active' : ''} ${isRead ? 'read' : ''}" 
                     onclick="selectChapter(${i})">${i}</button>`;
        }

        container.innerHTML = html;
    }

    function selectChapter(chapter) {
        state.currentChapter = chapter;
        saveState();
        renderChapterSelector();
        renderReadingContent();
    }

    function renderReadingView() {
        const book = getBook(state.currentBook);

        document.getElementById('readingEra').textContent = book.eraLabel;
        document.getElementById('readingTitle').textContent = book.name;
        document.getElementById('readingSubtitle').textContent = book.description;
        document.getElementById('metaDate').textContent = book.date;
        document.getElementById('metaAuthor').textContent = book.author;
        document.getElementById('metaChapters').textContent = book.chapters + ' capítulos';
        document.getElementById('metaLocation').textContent = book.location;

        renderChapterSelector();
        renderReadingContent();
        renderCharacters();
    }

    function renderReadingContent() {
        const book = getBook(state.currentBook);
        const key = `${book.id}-${state.currentChapter}`;
        const textData = bibleData.texts[key];
        const container = document.getElementById('readingContent');

        if (textData) {
            let html = `<h3 style="font-family: 'Merriweather', serif; font-size: 1.3rem; margin-bottom: 1.5rem; color: var(--secondary);">${textData.title}</h3>`;

            textData.verses.forEach(verse => {
                html += `<span class="verse-number">${verse.n}</span>`;
                // Make words clickable
                const words = verse.text.split(/(\s+)/);
                words.forEach(word => {
                    const cleanWord = word.replace(/[.,;:!?()"']/g, '').toLowerCase();
                    if (bibleData.dictionary[cleanWord]) {
                        html += `<span class="word" onclick="showWordPopup(event, '${cleanWord}')">${word}</span>`;
                    } else {
                        html += `<span class="word" onclick="showWordPopup(event, '${cleanWord}')">${word}</span>`;
                    }
                });
                html += ' ';
            });

            container.innerHTML = html;
        } else {
            // Generate placeholder for chapters without specific text
            let html = `<h3 style="font-family: 'Merriweather', serif; font-size: 1.3rem; margin-bottom: 1.5rem; color: var(--secondary);">${book.name} — Capítulo ${state.currentChapter}</h3>`;
            html += `<p style="color: var(--text-muted); line-height: 1.8;">`;
            html += `<em>📖 Este capítulo de ${book.name} está disponível para leitura.</em></p>`;
            html += `<div style="margin-top: 1.5rem; padding: 1.5rem; background: rgba(139, 92, 246, 0.1); border-radius: 12px; border: 1px solid var(--border);">`;
            html += `<p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.8rem;"><strong>📌 Sobre este capítulo:</strong></p>`;
            html += `<p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.7;">`;
            html += `${book.description}. Este é o capítulo ${state.currentChapter} de ${book.chapters} do livro de ${book.name}.`;
            html += ` Autor: ${book.author}. Data: ${book.date}. Local: ${book.location}.</p>`;
            html += `<p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.7; margin-top: 0.8rem;">`;
            html += `<strong>Dica:</strong> Para ler o texto completo, recomendamos usar uma Bíblia completa junto com este app. `;
            html += `Clique em qualquer palavra para ver seu significado original!</p>`;
            html += `</div>`;

            // Add some interactive words
            html += `<div style="margin-top: 1.5rem;">`;
            html += `<p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 0.5rem;"><strong>🔍 Palavras para estudar neste livro:</strong></p>`;
            html += `<div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">`;
            Object.keys(bibleData.dictionary).slice(0, 12).forEach(word => {
                html += `<span class="word" onclick="showWordPopup(event, '${word}')" style="padding: 0.3rem 0.7rem; background: rgba(245, 158, 11, 0.1); border-radius: 6px; font-size: 0.8rem;">${word}</span>`;
            });
            html += `</div></div>`;

            container.innerHTML = html;
        }
    }

    function renderCharacters() {
        const book = getBook(state.currentBook);
        const grid = document.getElementById('charactersGrid');

        if (book.characters && book.characters.length > 0) {
            let html = '';
            book.characters.forEach(char => {
                html += `
                    <div class="character-card">
                        <div class="character-avatar">${char.emoji}</div>
                        <div class="character-name">${char.name}</div>
                        <div class="character-role">${char.role}</div>
                    </div>
                `;
            });
            grid.innerHTML = html;
            document.getElementById('charactersSection').style.display = 'block';
        } else {
            document.getElementById('charactersSection').style.display = 'none';
        }
    }

    function showWordPopup(event, word) {
        event.stopPropagation();
        const popup = document.getElementById('wordPopup');
        const dictEntry = bibleData.dictionary[word];

        if (dictEntry) {
            document.getElementById('popupType').textContent = dictEntry.type;
            document.getElementById('popupTitle').textContent = word.charAt(0).toUpperCase() + word.slice(1);
            document.getElementById('popupOriginal').textContent = dictEntry.original;
            document.getElementById('popupMeaning').textContent = dictEntry.meaning;
        } else {
            document.getElementById('popupType').textContent = 'Dicionário';
            document.getElementById('popupTitle').textContent = word.charAt(0).toUpperCase() + word.slice(1);
            document.getElementById('popupOriginal').textContent = '';
            document.getElementById('popupMeaning').textContent = `A palavra "${word}" — clique em outras palavras destacadas para ver seus significados originais em hebraico e grego.`;
        }

        // Position popup
        const rect = event.target.getBoundingClientRect();
        let top = rect.bottom + 10;
        let left = rect.left;

        if (top + 200 > window.innerHeight) {
            top = rect.top - 200;
        }
        if (left + 350 > window.innerWidth) {
            left = window.innerWidth - 370;
        }
        if (left < 10) left = 10;

        popup.style.top = top + 'px';
        popup.style.left = left + 'px';
        popup.classList.add('show');
    }

    document.getElementById('wordPopupClose').addEventListener('click', () => {
        document.getElementById('wordPopup').classList.remove('show');
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.word-popup') && !e.target.closest('.word')) {
            document.getElementById('wordPopup').classList.remove('show');
        }
    });

    function markCurrentAsRead() {
        const key = `${state.currentBook}-${state.currentChapter}`;
        state.readChapters[key] = true;
        saveState();
        updateGlobalProgress();
        renderChapterSelector();
        renderSidebar();

        // Check if book is complete
        const book = getBook(state.currentBook);
        const bookReadCount = Object.keys(state.readChapters).filter(k => k.startsWith(book.id + '-')).length;
        if (bookReadCount === book.chapters) {
            showCelebration(`🎉 Livro Completo!`, `Parabéns! Você leu todo o livro de ${book.name}!`);
        }
    }

    function showCelebration(title, text) {
        document.getElementById('celebrationTitle').textContent = title;
        document.getElementById('celebrationText').textContent = text;
        document.getElementById('celebrationOverlay').classList.add('show');
    }

    function closeCelebration() {
        document.getElementById('celebrationOverlay').classList.remove('show');
    }

    // Navigation buttons
    document.getElementById('markRead').addEventListener('click', markCurrentAsRead);

    document.getElementById('prevChapter').addEventListener('click', () => {
        if (state.currentChapter > 1) {
            state.currentChapter--;
        } else {
            // Go to previous book
            const idx = bibleData.books.findIndex(b => b.id === state.currentBook);
            if (idx > 0) {
                state.currentBook = bibleData.books[idx - 1].id;
                state.currentChapter = getBook(state.currentBook).chapters;
                renderReadingView();
                renderSidebar();
                return;
            }
        }
        saveState();
        renderChapterSelector();
        renderReadingContent();
    });

    document.getElementById('nextChapter').addEventListener('click', () => {
        const book = getBook(state.currentBook);
        if (state.currentChapter < book.chapters) {
            state.currentChapter++;
        } else {
            // Go to next book
            const idx = bibleData.books.findIndex(b => b.id === state.currentBook);
            if (idx < bibleData.books.length - 1) {
                state.currentBook = bibleData.books[idx + 1].id;
                state.currentChapter = 1;
                renderReadingView();
                renderSidebar();
                return;
            }
        }
        saveState();
        renderChapterSelector();
        renderReadingContent();
    });

    // Tabs
    function switchTab(tabName) {
        state.activeTab = tabName;
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.nav-tab, .mobile-nav-btn').forEach(t => t.classList.remove('active'));
        document.getElementById(`tab-${tabName}`).classList.add('active');
        document.querySelectorAll(`[data-tab="${tabName}"]`).forEach(t => t.classList.add('active'));

        if (tabName === 'timeline') renderTimeline();
        if (tabName === 'media') renderMedia();
        if (tabName === 'dictionary') renderDictionary();
        if (tabName === 'stats') renderStats();
    }

    document.querySelectorAll('.nav-tab, .mobile-nav-btn').forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });

    // Timeline
    function renderTimeline() {
        const container = document.getElementById('timelineContainer');
        let html = '';

        bibleData.timeline.forEach(event => {
            const isCompleted = Object.keys(state.readChapters).some(k => k.startsWith(event.book + '-'));
            html += `
                <div class="timeline-item ${isCompleted ? 'completed' : ''}" onclick="selectBook('${event.book}'); switchTab('reading');">
                    <div class="timeline-date">${event.icon} ${event.date}</div>
                    <div class="timeline-title">${event.title}</div>
                    <div class="timeline-desc">${event.desc}</div>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    // Media
    function renderMedia() {
        const container = document.getElementById('mediaGrid');
        let html = '';

        // Videos
        bibleData.videos.forEach(video => {
            html += `
                <div class="media-card">
                    <div class="media-card-header">
                        <i class="fab fa-youtube" style="color: #FF0000;"></i>
                        <h3>${video.title}</h3>
                    </div>
                    <div class="video-container">
                        <iframe src="https://www.youtube.com/embed/${video.id}" 
                                allowfullscreen loading="lazy"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
                        </iframe>
                    </div>
                    <div style="padding: 0.8rem 1.2rem; font-size: 0.8rem; color: var(--text-muted);">
                        ${video.desc}
                    </div>
                </div>
            `;
        });

        // Maps
        bibleData.maps.forEach(map => {
            html += `
                <div class="media-card">
                    <div class="media-card-header">
                        <i class="fas fa-map-marked-alt" style="color: var(--success);"></i>
                        <h3>${map.title}</h3>
                    </div>
                    <div class="map-container">
                        <iframe src="https://www.openstreetmap.org/export/embed.html?bbox=${map.lng-1}%2C${map.lat-1}%2C${map.lng+1}%2C${map.lat+1}&layer=mapnik&marker=${map.lat}%2C${map.lng}" 
                                loading="lazy"></iframe>
                    </div>
                    <div style="padding: 0.8rem 1.2rem; font-size: 0.8rem; color: var(--text-muted);">
                        📍 ${map.desc}
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    // Dictionary
    function renderDictionary(filter = '') {
        const container = document.getElementById('dictGrid');
        let html = '';

        Object.entries(bibleData.dictionary).forEach(([word, entry]) => {
            if (filter && !word.includes(filter.toLowerCase())) return;
            html += `
                <div class="dict-card" onclick="showWordPopup(event, '${word}')">
                    <div class="dict-word">${word.charAt(0).toUpperCase() + word.slice(1)}</div>
                    <div class="dict-original">${entry.original}</div>
                    <div class="dict-meaning">${entry.meaning.substring(0, 100)}...</div>
                </div>
            `;
        });

        container.innerHTML = html || '<p style="color: var(--text-muted);">Nenhuma palavra encontrada.</p>';
    }

    document.getElementById('dictSearch').addEventListener('input', (e) => {
        renderDictionary(e.target.value);
    });

    // Stats
    function renderStats() {
        const readCount = getReadCount();
        const total = getTotalChapters();
        const percent = getProgressPercent();
        const booksStarted = new Set(Object.keys(state.readChapters).map(k => k.split('-')[0])).size;
        const booksCompleted = bibleData.books.filter(b => {
            const readCount = Object.keys(state.readChapters).filter(k => k.startsWith(b.id + '-')).length;
            return readCount === b.chapters;
        }).length;

        const container = document.getElementById('statsGrid');
        container.innerHTML = `
            <div class="stat-card">
                <div class="stat-icon" style="background: rgba(108, 60, 225, 0.2); color: var(--primary-light);">
                    <i class="fas fa-percentage"></i>
                </div>
                <div class="stat-value" style="color: var(--primary-light);">${percent}%</div>
                <div class="stat-label">Progresso Total</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon" style="background: rgba(16, 185, 129, 0.2); color: var(--success);">
                    <i class="fas fa-check-double"></i>
                </div>
                <div class="stat-value" style="color: var(--success);">${readCount}</div>
                <div class="stat-label">Capítulos Lidos</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon" style="background: rgba(245, 158, 11, 0.2); color: var(--secondary);">
                    <i class="fas fa-book"></i>
                </div>
                <div class="stat-value" style="color: var(--secondary);">${booksStarted}</div>
                <div class="stat-label">Livros Iniciados</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon" style="background: rgba(239, 68, 68, 0.2); color: var(--danger);">
                    <i class="fas fa-trophy"></i>
                </div>
                <div class="stat-value" style="color: var(--danger);">${booksCompleted}</div>
                <div class="stat-label">Livros Completos</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon" style="background: rgba(59, 130, 246, 0.2); color: #3B82F6;">
                    <i class="fas fa-list-ol"></i>
                </div>
                <div class="stat-value" style="color: #3B82F6;">${total}</div>
                <div class="stat-label">Total de Capítulos</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon" style="background: rgba(139, 92, 246, 0.2); color: var(--text-secondary);">
                    <i class="fas fa-hourglass-half"></i>
                </div>
                <div class="stat-value" style="color: var(--text-secondary);">${total - readCount}</div>
                <div class="stat-label">Capítulos Restantes</div>
            </div>
        `;

        // Era progress
        const eras = {};
        bibleData.books.forEach(book => {
            if (!eras[book.eraLabel]) eras[book.eraLabel] = { total: 0, read: 0 };
            eras[book.eraLabel].total += book.chapters;
            const bookRead = Object.keys(state.readChapters).filter(k => k.startsWith(book.id + '-')).length;
            eras[book.eraLabel].read += bookRead;
        });

        let eraHtml = '';
        Object.entries(eras).forEach(([era, data]) => {
            const eraPercent = Math.round((data.read / data.total) * 100);
            eraHtml += `
                <div style="margin-bottom: 1rem;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.3rem;">
                        <span style="font-size: 0.85rem; color: var(--text-secondary);">${era}</span>
                        <span style="font-size: 0.8rem; color: var(--text-muted);">${data.read}/${data.total} (${eraPercent}%)</span>
                    </div>
                    <div class="progress-bar-container">
                        <div class="progress-bar-fill" style="width: ${eraPercent}%; background: ${getProgressColor(eraPercent)};"></div>
                    </div>
                </div>
            `;
        });

        document.getElementById('eraProgress').innerHTML = eraHtml;
    }

    // Search
    document.getElementById('bookSearch').addEventListener('input', renderSidebar);

    // Sidebar toggle
    document.getElementById('sidebarToggle').addEventListener('click', () => {
        document.getElementById('sidebar').classList.toggle('open');
    });

    // ===== INITIAL RENDER =====
    renderSidebar();
    renderReadingView();
    updateGlobalProgress();

    </script>
</body>
</html>
