<script>
        // 🔑 Token Address Management
        const TOKEN_ADDRESS = 'REPLACE_WITH_YOUR_SOLANA_TOKEN_ADDRESS'; 
        const SOL_MINT = 'So11111111111111111111111111111111111111112';

        // Function to populate iframe and button URLs
        function updateTokenAddresses() {
            // Main Charts (These will look empty/broken until you have a real address, but that's expected)
            document.querySelector('[data-chart="dex-main"]').src = `https://dexscreener.com/solana/${TOKEN_ADDRESS}?embed=1`;
            document.querySelector('[data-chart="pump-main"]').src = `https://pumpfun.com/chart/solana/${TOKEN_ADDRESS}`;
            
            // Popup Charts
            document.querySelector('#charts-box [data-chart="dex"]').src = `https://dexscreener.com/solana/${TOKEN_ADDRESS}?embed=1`;
            document.querySelector('#charts-box [data-chart="pump"]').src = `https://pumpfun.com/chart/solana/${TOKEN_ADDRESS}`;
            
            // Swap - RAYDIUM
            document.querySelector('[data-swap="raydium-widget"]').src = `https://raydium.io/swap?tokenIn=SOL&tokenOut=${TOKEN_ADDRESS}&embed=true`;

            // Swap - JUPITER (✅ THE FIX: DIRECT TO GENERAL SWAP PAGE)
            // Since we don't have a token address yet, we link to the standard SOL-USDC pair
            const jupButtons = document.querySelectorAll('[data-swap="jupiter-button"]');
            jupButtons.forEach(btn => {
                // This link works immediately for everyone:
                btn.href = "https://jup.ag/swap/SOL-USDC"; 
            });
        }
        
        updateTokenAddresses();

        // Dark/Light Toggle
        const toggle = document.getElementById('theme-toggle');
        const body = document.body;
        
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            body.classList.add('light-mode');
            toggle.checked = true;
        } else {
            body.classList.add('dark-mode');
        }

        toggle.addEventListener('change', () => {
            if (toggle.checked) {
                body.classList.remove('dark-mode');
                body.classList.add('light-mode');
                localStorage.setItem('theme', 'light');
            } else {
                body.classList.remove('light-mode');
                body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            }
        });

        // Scroll fade-in animation
        const charts = document.querySelectorAll('.chart-wrapper');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if(entry.isIntersecting) entry.target.classList.add('visible');
            });
        }, { threshold: 0.2 });
        charts.forEach(chart => observer.observe(chart));

        // --- POPUP LOGIC (Desktop & Mobile Combined) ---
        const popups = document.querySelectorAll('.popup-box');
        const menuBtns = document.querySelectorAll('.menu-btn'); // Desktop buttons
        const mobileLinks = document.querySelectorAll('.mobile-link'); // Mobile buttons
        const closeBtns = document.querySelectorAll('.close-popup');

        // Function to open a popup
        function openPopup(targetId) {
            popups.forEach(popup => popup.style.display = 'none'); // Close others
            document.getElementById(targetId).style.display = 'block'; // Open target
        }

        // 1. Desktop Button Clicks
        menuBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                if(btn.onclick) return; 
                e.stopPropagation(); 
                openPopup(btn.getAttribute('data-target'));
            });
        });

        // 2. Mobile Link Clicks
        mobileLinks.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                // Close the mobile menu first
                document.getElementById('mobile-menu-overlay').style.display = 'none';
                // Then open the popup
                openPopup(btn.getAttribute('data-target'));
            });
        });

        // 3. Close Buttons (X)
        closeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                btn.parentElement.style.display = 'none';
            });
        });

        // 4. Click Outside to Close
        document.addEventListener('click', (e) => {
            popups.forEach(popup => {
                // Check if click is NOT on popup, NOT on desktop button, NOT on mobile button
                if (!popup.contains(e.target) && 
                    !Array.from(menuBtns).includes(e.target) && 
                    !Array.from(mobileLinks).includes(e.target)) {
                     popup.style.display = 'none';
                }
            });
        });

        // --- MOBILE MENU LOGIC ---
        const mobileTrigger = document.getElementById('mobile-menu-trigger');
        const mobileOverlay = document.getElementById('mobile-menu-overlay');
        const closeMobile = document.querySelector('.close-mobile');

        mobileTrigger.addEventListener('click', () => {
            mobileOverlay.style.display = 'block';
        });

        closeMobile.addEventListener('click', () => {
            mobileOverlay.style.display = 'none';
        });

    </script>