/**
 * Märkuste süsteem elektripaigaldiste juhendile
 * Versioon 3.0 - Lihtsustatud ja lollikindel
 *
 * Funktsioonid:
 * - Teksti valimine ja parema hiire klõps
 * - Märkuse lisamine
 * - Kõik märkused ühes kohas (kogu juhend)
 * - Saatmine e-postiga
 * - Hoiatus kui sulgeb lehe ilma saatmata
 */

(function() {
    'use strict';

    // GLOBAALNE salvestus - KÕIK märkused kogu juhendist
    const STORAGE_KEY = 'elektri-juhend-all-comments';
    let allComments = [];
    let selectedText = '';
    let selectedRange = null;

    // Lae KÕIK märkused
    function loadAllComments() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                allComments = JSON.parse(saved);
                console.log('✅ Laetud märkusi:', allComments.length);
            }
        } catch (e) {
            console.error('❌ Märkuste laadimine ebaõnnestus:', e);
            allComments = [];
        }

        // Renderi ainult praeguse lehe märkused
        renderPageComments();
        updateBadge();
    }

    // Salvesta KÕIK märkused
    function saveAllComments() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(allComments));
            updateBadge();
        } catch (e) {
            console.error('❌ Märkuste salvestamine ebaõnnestus:', e);
        }
    }

    // Uuenda badge (kogu juhendi märkuste arv)
    function updateBadge() {
        const exportBtn = document.getElementById('comment-export-btn');
        if (exportBtn) {
            let badge = exportBtn.querySelector('.comment-badge');
            if (allComments.length > 0) {
                if (!badge) {
                    badge = document.createElement('span');
                    badge.className = 'comment-badge';
                    exportBtn.appendChild(badge);
                }
                badge.textContent = allComments.length;
            } else if (badge) {
                badge.remove();
            }
        }
    }

    // Renderi ainult praeguse lehe märkused
    function renderPageComments() {
        console.log('🎨 Renderdan märkuseid...');

        // Eemalda kõik vanad märgistused
        document.querySelectorAll('.comment-icon').forEach(icon => icon.remove());
        document.querySelectorAll('.comment-highlight').forEach(el => {
            // Taasta originaal tekst
            const parent = el.parentNode;
            if (parent) {
                const text = el.textContent;
                parent.replaceChild(document.createTextNode(text), el);
                // Normaliseeri parent (ühenda textNode'd)
                parent.normalize();
            }
        });

        const currentPath = window.location.pathname;
        const pageComments = allComments.filter(c => c.pageUrl === currentPath);

        console.log('📍 Praegune leht:', currentPath);
        console.log('💬 Märkusi sellel lehel:', pageComments.length);

        if (pageComments.length === 0) {
            console.log('⚠️ Sellel lehel pole märkuseid');
            return;
        }

        // Oota, et leht oleks valmis - pikem timeout GitHub Pages jaoks
        setTimeout(() => {
            pageComments.forEach((comment, index) => {
                console.log(`🔍 Otsin märkust ${index + 1}:`, comment.selectedText.substring(0, 30) + '...');
                const element = findElementByXPath(comment.xpath);
                if (element) {
                    console.log('✅ Element leitud:', element.tagName, element.className);
                    highlightText(element, comment);
                } else {
                    console.warn('❌ Elementi ei leitud XPath:', comment.xpath);
                    console.log('🔄 Proovin alternatiivset meetodit...');

                    // Fallback: otsi tekstist otse
                    findAndHighlightByText(comment);
                }
            });
        }, 500); // Pikem timeout
    }

    // Alternatiivne meetod: otsi teksti põhjal (kui XPath ei tööta)
    function findAndHighlightByText(comment) {
        try {
            // Otsi kõigist article elementidest
            const articles = document.querySelectorAll('article, .md-content, main, [role="main"]');

            for (const article of articles) {
                const walker = document.createTreeWalker(
                    article,
                    NodeFilter.SHOW_TEXT,
                    {
                        acceptNode: function(node) {
                            // Ignoreeri script ja style elemente
                            if (node.parentNode.tagName === 'SCRIPT' ||
                                node.parentNode.tagName === 'STYLE' ||
                                node.parentNode.classList.contains('comment-icon') ||
                                node.parentNode.classList.contains('comment-highlight')) {
                                return NodeFilter.FILTER_REJECT;
                            }
                            return NodeFilter.FILTER_ACCEPT;
                        }
                    },
                    false
                );

                while (walker.nextNode()) {
                    const node = walker.currentNode;
                    if (node.textContent && node.textContent.includes(comment.selectedText)) {
                        console.log('🎯 Leidsin teksti fallback meetodil!');
                        highlightText(node.parentNode, comment);
                        return;
                    }
                }
            }

            console.warn('⚠️ Teksti ei leitud ka fallback meetodil');
        } catch (error) {
            console.error('❌ Fallback error:', error);
        }
    }

    // Leia element XPath järgi
    function findElementByXPath(xpath) {
        try {
            const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            return result.singleNodeValue;
        } catch (e) {
            return null;
        }
    }

    // Tõsta tekst esile ja lisa ikoon
    function highlightText(element, comment) {
        try {
            if (!element) {
                console.warn('Element puudub');
                return;
            }

            // Leia õige textNode mis sisaldab valitud teksti
            const walker = document.createTreeWalker(
                element,
                NodeFilter.SHOW_TEXT,
                null,
                false
            );

            let textNode;
            while (walker.nextNode()) {
                const node = walker.currentNode;
                if (node.textContent && node.textContent.includes(comment.selectedText)) {
                    textNode = node;
                    break;
                }
            }

            if (!textNode) {
                console.warn('TextNode ei leitud:', comment.selectedText.substring(0, 30));
                return;
            }

            const text = textNode.textContent;
            const index = text.indexOf(comment.selectedText);

            if (index === -1) {
                console.warn('Teksti ei leitud:', comment.selectedText.substring(0, 30));
                return;
            }

            const before = text.substring(0, index);
            const selected = text.substring(index, index + comment.selectedText.length);
            const after = text.substring(index + comment.selectedText.length);

            // Loo highlight element
            const highlightSpan = document.createElement('span');
            highlightSpan.className = 'comment-highlight';
            highlightSpan.setAttribute('data-comment-id', comment.id);
            highlightSpan.textContent = selected;

            // Loo ikoon
            const icon = document.createElement('span');
            icon.className = 'comment-icon';
            icon.setAttribute('data-comment-id', comment.id);
            icon.innerHTML = '💬';
            icon.title = 'Vaata märkust';
            icon.addEventListener('click', (e) => {
                e.stopPropagation();
                showCommentPopup(comment, e.clientX, e.clientY);
            });

            // Asenda textNode uute elementidega
            const parent = textNode.parentNode;
            const fragment = document.createDocumentFragment();

            if (before) {
                fragment.appendChild(document.createTextNode(before));
            }
            fragment.appendChild(highlightSpan);
            fragment.appendChild(icon);
            if (after) {
                fragment.appendChild(document.createTextNode(after));
            }

            parent.replaceChild(fragment, textNode);

            console.log('✅ Highlight lisatud:', comment.selectedText.substring(0, 30) + '...');
        } catch (error) {
            console.error('❌ Highlight error:', error, comment);
        }
    }

    // Näita märkuse popup
    function showCommentPopup(comment, x, y) {
        // Eemalda vanad popupid
        document.querySelectorAll('.comment-popup').forEach(p => p.remove());

        const popup = document.createElement('div');
        popup.className = 'comment-popup';
        popup.style.position = 'fixed';
        popup.style.left = x + 'px';
        popup.style.top = y + 'px';

        popup.innerHTML = `
            <div class="comment-popup-header">
                <strong>💬 Märkus</strong>
                <button class="comment-popup-close">×</button>
            </div>
            <div class="comment-popup-body">
                <p><strong>Autor:</strong> ${comment.author}</p>
                <p class="comment-popup-selected">"${comment.selectedText}"</p>
                <p><strong>Märkus:</strong> ${comment.text}</p>
                <p class="comment-popup-time">Leht: ${comment.pageTitle}<br>${new Date(comment.timestamp).toLocaleString('et-EE')}</p>
            </div>
            <div class="comment-popup-footer">
                <button class="comment-btn-small comment-delete-btn">🗑️ Kustuta</button>
            </div>
        `;

        document.body.appendChild(popup);

        // Sulge nupp
        popup.querySelector('.comment-popup-close').addEventListener('click', () => {
            popup.remove();
        });

        // Kustuta nupp
        popup.querySelector('.comment-delete-btn').addEventListener('click', () => {
            if (confirm('Kas oled kindel, et soovid selle märkuse kustutada?')) {
                allComments = allComments.filter(c => c.id !== comment.id);
                saveAllComments();
                renderPageComments();
                popup.remove();
                showNotification('Märkus kustutatud');
            }
        });

        // Sulge kui klikitakse väljaspool
        setTimeout(() => {
            document.addEventListener('click', function closePopup(e) {
                if (!popup.contains(e.target)) {
                    popup.remove();
                    document.removeEventListener('click', closePopup);
                }
            });
        }, 100);
    }

    // Parem hiire klõps tekstil
    document.addEventListener('contextmenu', function(e) {
        // Kontrolli, et ei ole klõpsatud märkuste liidese elementidel
        if (e.target.closest('.comment-popup, .comment-dialog-overlay, .comment-export-menu, .comment-icon, .comment-export-btn')) {
            return;
        }

        const selection = window.getSelection();
        const text = selection.toString().trim();

        console.log('Parem klõps! Tekst valitud:', text.length, 'tähemärki');

        if (text.length > 0) {
            e.preventDefault(); // Blokeeri default kontekstimenüü
            e.stopPropagation();

            selectedText = text;
            try {
                selectedRange = selection.getRangeAt(0);
                const x = e.clientX;
                const y = e.clientY;
                showContextMenu(x, y);
                console.log('✅ Kontekstimenüü peaks ilmuma:', x, y);
            } catch (err) {
                console.error('❌ Viga range saamisel:', err);
            }
        } else {
            hideContextMenu();
        }
    });

    // Kontekstimenüü
    let contextMenu = null;

    function showContextMenu(x, y) {
        console.log('🎯 showContextMenu käivitus:', x, y);
        hideContextMenu();

        contextMenu = document.createElement('div');
        contextMenu.className = 'comment-context-menu show'; // Lisa 'show' klass
        contextMenu.style.position = 'fixed';
        contextMenu.style.left = x + 'px';
        contextMenu.style.top = y + 'px';
        contextMenu.style.zIndex = '10000';
        contextMenu.innerHTML = '<button class="comment-menu-btn">💬 Lisa märkus</button>';

        console.log('📦 Kontekstimenüü loodud:', contextMenu);

        document.body.appendChild(contextMenu);

        console.log('✅ Kontekstimenüü on nüüd DOM-is!');
        console.log('📍 Asukoht:', contextMenu.style.left, contextMenu.style.top);
        console.log('👁️ Display:', window.getComputedStyle(contextMenu).display);

        contextMenu.querySelector('.comment-menu-btn').addEventListener('click', () => {
            console.log('🖱️ Lisa märkus nupp vajutatud!');
            showAddCommentDialog();
            hideContextMenu();
        });

        // Sulge kui klikitakse mujale
        setTimeout(() => {
            document.addEventListener('click', function closeMenu(e) {
                if (!contextMenu || !contextMenu.contains(e.target)) {
                    hideContextMenu();
                    document.removeEventListener('click', closeMenu);
                }
            });
        }, 100);
    }

    function hideContextMenu() {
        if (contextMenu) {
            contextMenu.remove();
            contextMenu = null;
        }
    }

    // Lisa märkuse dialoog
    function showAddCommentDialog() {
        const overlay = document.createElement('div');
        overlay.className = 'comment-dialog-overlay';

        const dialog = document.createElement('div');
        dialog.className = 'comment-dialog';

        dialog.innerHTML = `
            <div class="comment-dialog-header">
                <h3>💬 Lisa märkus</h3>
                <button class="comment-dialog-close">×</button>
            </div>
            <div class="comment-dialog-body">
                <p class="comment-selected-text">"${selectedText}"</p>
                <input type="text" class="comment-author-input" placeholder="Sinu nimi" value="${getLastAuthor()}">
                <textarea class="comment-text-input" placeholder="Kirjuta märkus siia..." rows="5"></textarea>
            </div>
            <div class="comment-dialog-footer">
                <button class="comment-btn-cancel">Tühista</button>
                <button class="comment-btn-save">💾 Salvesta märkus</button>
            </div>
        `;

        overlay.appendChild(dialog);
        document.body.appendChild(overlay);

        const authorInput = dialog.querySelector('.comment-author-input');
        const textInput = dialog.querySelector('.comment-text-input');
        const saveBtn = dialog.querySelector('.comment-btn-save');
        const cancelBtn = dialog.querySelector('.comment-btn-cancel');
        const closeBtn = dialog.querySelector('.comment-dialog-close');

        // Focus tekstiväljale
        setTimeout(() => textInput.focus(), 100);

        // Salvesta
        saveBtn.addEventListener('click', () => {
            const author = authorInput.value.trim();
            const text = textInput.value.trim();

            if (!author || !text) {
                alert('Palun täida nii nimi kui ka märkus!');
                return;
            }

            addComment(author, text);
            overlay.remove();
        });

        // Tühista
        cancelBtn.addEventListener('click', () => overlay.remove());
        closeBtn.addEventListener('click', () => overlay.remove());
    }

    // Lisa märkus
    function addComment(author, text) {
        if (!selectedRange) return;

        const xpath = getXPath(selectedRange.startContainer);

        const comment = {
            id: Date.now() + '-' + Math.random().toString(36).substr(2, 9),
            author: author,
            text: text,
            selectedText: selectedText,
            timestamp: new Date().toISOString(),
            pageUrl: window.location.pathname,
            pageTitle: document.title,
            xpath: xpath
        };

        allComments.push(comment);
        saveAllComments();
        renderPageComments();

        // Salvesta autor
        localStorage.setItem('lastAuthor', author);

        showNotification('✓ Märkus lisatud!');

        // Tühista valik
        window.getSelection().removeAllRanges();
        selectedText = '';
        selectedRange = null;
    }

    // Viimane autor
    function getLastAuthor() {
        return localStorage.getItem('lastAuthor') || '';
    }

    // XPath genereerimine
    function getXPath(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            node = node.parentNode;
        }

        const parts = [];
        while (node && node.nodeType === Node.ELEMENT_NODE) {
            let index = 0;
            let sibling = node.previousSibling;
            while (sibling) {
                if (sibling.nodeType === Node.ELEMENT_NODE && sibling.nodeName === node.nodeName) {
                    index++;
                }
                sibling = sibling.previousSibling;
            }

            const tagName = node.nodeName.toLowerCase();
            const pathIndex = index > 0 ? `[${index + 1}]` : '';
            parts.unshift(tagName + pathIndex);

            node = node.parentNode;
        }

        return '/' + parts.join('/');
    }

    // Teade
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'comment-notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => notification.classList.add('show'), 10);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    // E-POSTI SAATMINE
    function sendAllCommentsViaEmail() {
        if (allComments.length === 0) {
            alert('Märkuseid pole! Vali juhendis tekst ja lisa märkus.');
            return;
        }

        const date = new Date().toLocaleDateString('et-EE');
        const author = allComments[0]?.author || 'Teostaja';
        const subject = `Juhendi märkused / ${date} / ${author}`;

        // Grupeeri märkused lehe kaupa
        const byPage = {};
        allComments.forEach(c => {
            if (!byPage[c.pageTitle]) {
                byPage[c.pageTitle] = [];
            }
            byPage[c.pageTitle].push(c);
        });

        let body = `Tere!

Saadetud on elektripaigaldiste juhendi märkused.

KOKKU MÄRKUSI: ${allComments.length}
KUUPÄEV: ${date}
TEOSTAJA: ${author}

`;

        // Lisa märkused lehe kaupa
        Object.keys(byPage).forEach((pageTitle, pageIndex) => {
            body += `\n${'='.repeat(60)}\n`;
            body += `LEHT ${pageIndex + 1}: ${pageTitle}\n`;
            body += `MÄRKUSI: ${byPage[pageTitle].length}\n`;
            body += `${'='.repeat(60)}\n\n`;

            byPage[pageTitle].forEach((c, i) => {
                body += `${i + 1}. MÄRKUS\n`;
                body += `   Autor: ${c.author}\n`;
                body += `   Kuupäev: ${new Date(c.timestamp).toLocaleString('et-EE')}\n`;
                body += `   Valitud tekst: "${c.selectedText}"\n`;
                body += `   Kommentaar: ${c.text}\n\n`;
            });
        });

        body += `\n${'='.repeat(60)}\n`;
        body += `Loodud automaatselt elektrijd.ee juhendis\n`;

        const mailto = `mailto:dmitri@meliorprojekt.ee?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Ava e-posti klient
        window.location.href = mailto;

        showNotification('📧 E-posti klient avatud!');
    }

    // Näita ekspordi menüü (ainult e-post)
    function showExportMenu() {
        const menu = document.createElement('div');
        menu.className = 'comment-export-menu';

        const content = document.createElement('div');
        content.className = 'comment-export-menu-content';

        // Genereeri märkuste nimekiri
        let commentsList = '';
        if (allComments.length > 0) {
            // Grupeeri lehe kaupa
            const byPage = {};
            allComments.forEach(c => {
                if (!byPage[c.pageTitle]) {
                    byPage[c.pageTitle] = [];
                }
                byPage[c.pageTitle].push(c);
            });

            commentsList = '<div class="comment-list-preview">';
            Object.keys(byPage).forEach((pageTitle, pageIndex) => {
                commentsList += `
                    <div class="comment-page-group">
                        <div class="comment-page-title">📄 ${pageTitle}</div>
                `;
                byPage[pageTitle].forEach((c, i) => {
                    const shortText = c.selectedText.length > 50 ? c.selectedText.substring(0, 50) + '...' : c.selectedText;
                    const shortComment = c.text.length > 80 ? c.text.substring(0, 80) + '...' : c.text;
                    commentsList += `
                        <div class="comment-preview-item" data-comment-id="${c.id}">
                            <div class="comment-preview-author">👤 ${c.author}</div>
                            <div class="comment-preview-text">"${shortText}"</div>
                            <div class="comment-preview-comment">💬 ${shortComment}</div>
                            <div class="comment-preview-actions">
                                <button class="comment-action-btn comment-edit-btn" data-comment-id="${c.id}" title="Muuda märkust">✏️</button>
                                <button class="comment-action-btn comment-delete-btn" data-comment-id="${c.id}" title="Kustuta märkus">🗑️</button>
                            </div>
                        </div>
                    `;
                });
                commentsList += `</div>`;
            });
            commentsList += '</div>';
        }

        content.innerHTML = `
            <h3>📥 Saada märkused</h3>
            <p>Kokku märkuseid: <strong>${allComments.length}</strong></p>
            ${allComments.length === 0 ? '<p style="color: #f44336;">⚠️ Pole ühtegi märkust!</p>' : commentsList}
            <div class="comment-export-buttons">
                <button class="comment-btn-email" ${allComments.length === 0 ? 'disabled' : ''}>
                    📧 Saada e-postiga
                </button>
            </div>
            <button class="comment-btn-cancel" style="margin-top: 20px; width: 100%;">Sulge</button>
        `;

        menu.appendChild(content);
        document.body.appendChild(menu);

        // Edit nupud
        content.querySelectorAll('.comment-edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const commentId = btn.getAttribute('data-comment-id');
                const comment = allComments.find(c => c.id === commentId);
                if (comment) {
                    menu.remove(); // Sulge ekspordi menüü
                    showEditCommentDialog(comment);
                }
            });
        });

        // Delete nupud
        content.querySelectorAll('.comment-delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const commentId = btn.getAttribute('data-comment-id');
                const comment = allComments.find(c => c.id === commentId);
                if (comment && confirm(`Kas oled kindel, et soovid kustutada märkuse?\n\n"${comment.selectedText}"\n${comment.text}`)) {
                    allComments = allComments.filter(c => c.id !== commentId);
                    saveAllComments();
                    renderPageComments();
                    menu.remove();
                    showNotification('Märkus kustutatud');
                    // Ava menüü uuesti et näidata uuendatud nimekirja
                    setTimeout(() => showExportMenu(), 300);
                }
            });
        });

        // E-posti nupp
        const emailBtn = content.querySelector('.comment-btn-email');
        if (emailBtn && allComments.length > 0) {
            emailBtn.addEventListener('click', () => {
                sendAllCommentsViaEmail();
                menu.remove();
            });
        }

        // Sulge nupp
        content.querySelector('.comment-btn-cancel').addEventListener('click', () => {
            menu.remove();
        });

        // Sulge kui klikitakse overlay-le
        menu.addEventListener('click', (e) => {
            if (e.target === menu) {
                menu.remove();
            }
        });
    }

    // Näita märkuse redigeerimise dialoog
    function showEditCommentDialog(comment) {
        const overlay = document.createElement('div');
        overlay.className = 'comment-dialog-overlay';

        const dialog = document.createElement('div');
        dialog.className = 'comment-dialog';

        dialog.innerHTML = `
            <div class="comment-dialog-header">
                <h3>✏️ Muuda märkust</h3>
                <button class="comment-dialog-close">×</button>
            </div>
            <div class="comment-dialog-body">
                <p class="comment-selected-text">"${comment.selectedText}"</p>
                <input type="text" class="comment-author-input" placeholder="Sinu nimi" value="${comment.author}">
                <textarea class="comment-text-input" placeholder="Kirjuta märkus siia..." rows="5">${comment.text}</textarea>
            </div>
            <div class="comment-dialog-footer">
                <button class="comment-btn-cancel">Tühista</button>
                <button class="comment-btn-save">💾 Salvesta muudatused</button>
            </div>
        `;

        overlay.appendChild(dialog);
        document.body.appendChild(overlay);

        const authorInput = dialog.querySelector('.comment-author-input');
        const textInput = dialog.querySelector('.comment-text-input');
        const saveBtn = dialog.querySelector('.comment-btn-save');
        const cancelBtn = dialog.querySelector('.comment-btn-cancel');
        const closeBtn = dialog.querySelector('.comment-dialog-close');

        // Focus tekstiväljale
        setTimeout(() => textInput.focus(), 100);

        // Salvesta muudatused
        saveBtn.addEventListener('click', () => {
            const newAuthor = authorInput.value.trim();
            const newText = textInput.value.trim();

            if (!newAuthor || !newText) {
                alert('Palun täida nii nimi kui ka märkus!');
                return;
            }

            // Uuenda märkust
            const commentIndex = allComments.findIndex(c => c.id === comment.id);
            if (commentIndex !== -1) {
                allComments[commentIndex].author = newAuthor;
                allComments[commentIndex].text = newText;
                saveAllComments();
                renderPageComments();
                showNotification('✓ Märkus uuendatud!');
            }

            overlay.remove();
            // Ava ekspordi menüü uuesti
            setTimeout(() => showExportMenu(), 300);
        });

        // Tühista
        cancelBtn.addEventListener('click', () => {
            overlay.remove();
            // Ava ekspordi menüü tagasi
            setTimeout(() => showExportMenu(), 100);
        });

        closeBtn.addEventListener('click', () => {
            overlay.remove();
            setTimeout(() => showExportMenu(), 100);
        });
    }

    // Näita juhendi dialoog
    function showHelpDialog() {
        const overlay = document.createElement('div');
        overlay.className = 'comment-dialog-overlay';

        const dialog = document.createElement('div');
        dialog.className = 'comment-dialog comment-help-dialog';

        dialog.innerHTML = `
            <div class="comment-dialog-header">
                <h3>ℹ️ Kuidas märkuseid kasutada?</h3>
                <button class="comment-dialog-close">×</button>
            </div>
            <div class="comment-dialog-body comment-help-content">
                <h4>1️⃣ Märkuse lisamine</h4>
                <ol>
                    <li>Vali hiire kursoriga tekst, mille kohta soovid märkuse teha</li>
                    <li>Vajuta <strong>paremat hiirenupp</strong> (right-click)</li>
                    <li>Klõpsa ilmuvale nupule <strong>"💬 Lisa märkus"</strong></li>
                    <li>Täida vorm:
                        <ul>
                            <li>Sisesta oma nimi</li>
                            <li>Kirjuta märkus</li>
                        </ul>
                    </li>
                    <li>Vajuta <strong>"💾 Salvesta märkus"</strong></li>
                </ol>

                <h4>2️⃣ Märkuste vaatamine</h4>
                <ul>
                    <li>Märgitud tekst on <span style="background: #fff176; padding: 2px 4px;">kollaselt esile tõstetud</span></li>
                    <li>Teksti kõrval on <strong>💬 ikoon</strong></li>
                    <li>Klõpsa ikoonil, et märkust vaadata või kustutada</li>
                </ul>

                <h4>3️⃣ Badge (Märkuste arv)</h4>
                <p>Ekraani paremas alanurgas olev <strong>💬</strong> nupp näitab punast badge'i koos <strong>kõigi märkuste arvuga</strong> kogu juhendist (mitte ainult praeguselt lehelt).</p>

                <h4>4️⃣ Märkuste saatmine</h4>
                <ol>
                    <li>Vajuta <strong>💬</strong> nuppu ekraani paremas alanurgas</li>
                    <li>Vaata üle märkuste nimekiri</li>
                    <li>Klõpsa <strong>"📧 Saada e-postiga"</strong></li>
                    <li>E-posti klient avaneb automaatselt valmis kirjaga</li>
                    <li>Saada kiri!</li>
                </ol>

                <h4>⚠️ Oluline teada</h4>
                <ul>
                    <li><strong>Märkused salvestatakse brauseri mälus</strong> (localStorage)</li>
                    <li><strong>Ei sünkroniseeru</strong> teiste arvutite/brauseritega</li>
                    <li><strong>Kaovad</strong> kui kustutad brauseri andmed</li>
                    <li><strong>Hoiatus</strong> ilmub kui proovid lehte sulgeda ilma märkuseid saatmata</li>
                </ul>

                <h4>💡 Näpunäited</h4>
                <ul>
                    <li>Saada märkused regulaarselt e-postiga, et mitte kaotada</li>
                    <li>Vali täpselt see tekstiosa, mille kohta märkus käib</li>
                    <li>Kirjuta selged ja konstruktiivsed märkused</li>
                    <li>Märkusi saab kustutada klõpsates 💬 ikoonil ja vajutades "🗑️ Kustuta"</li>
                </ul>
            </div>
            <div class="comment-dialog-footer">
                <button class="comment-btn-save">Sain aru!</button>
            </div>
        `;

        overlay.appendChild(dialog);
        document.body.appendChild(overlay);

        // Sulgemise nupud
        const closeBtn = dialog.querySelector('.comment-dialog-close');
        const okBtn = dialog.querySelector('.comment-btn-save');

        closeBtn.addEventListener('click', () => overlay.remove());
        okBtn.addEventListener('click', () => overlay.remove());

        // Sulge kui klikitakse overlay-le
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
            }
        });
    }

    // Loo ekspordi nupp (ülemine)
    function createExportButton() {
        const button = document.createElement('button');
        button.id = 'comment-export-btn';
        button.className = 'comment-export-btn';
        button.innerHTML = '💬';
        button.title = 'Märkused - klõpsa saatmiseks';

        button.addEventListener('click', showExportMenu);

        document.body.appendChild(button);
        updateBadge();
    }

    // Loo info nupp (alumine - pulseeriv)
    function createInfoButton() {
        const button = document.createElement('button');
        button.id = 'comment-info-btn';
        button.className = 'comment-info-btn';
        button.innerHTML = 'ℹ️';
        button.title = 'Kuidas märkuseid kasutada?';

        button.addEventListener('click', showHelpDialog);

        document.body.appendChild(button);
    }

    // HOIATUS LEHE SULGEMISEL
    let emailSent = false;

    window.addEventListener('beforeunload', function(e) {
        if (allComments.length > 0 && !emailSent) {
            const message = 'Sul on saatmata märkuseid! Kas oled kindel, et soovid lahkuda?';
            e.preventDefault();
            e.returnValue = message;
            return message;
        }
    });

    // Märgi, et e-post saadeti (kuigi tegelikult ei tea, aga andkem kasutajale rahu)
    // See on lihtsustus - tõeline tracking oleks keeruline
    window.addEventListener('visibilitychange', function() {
        if (document.hidden && allComments.length > 0) {
            // Kui kasutaja läheb e-posti klienti, siis eeldame, et saadab
            setTimeout(() => {
                emailSent = true;
            }, 5000);
        }
    });

    // INITSIALISEERIMMINE
    function init() {
        console.log('🚀 Käivitan märkuste süsteemi...');
        loadAllComments();
        createExportButton();
        createInfoButton();
        console.log('✅ Märkuste süsteem käivitatud!');
    }

    // MkDocs navigation event (instant loading)
    // Kuula ka MkDocs'i page change event'i
    if (typeof document$ !== 'undefined') {
        console.log('📡 MkDocs instant loading tuvasatud');
        document$.subscribe(function() {
            console.log('📄 Leht muutus (document$), laen märkused uuesti...');
            setTimeout(() => {
                loadAllComments();
            }, 300);
        });
    }

    // Kuula ka hashchange
    window.addEventListener('hashchange', function() {
        console.log('🔗 Hash muutus, renderin märkused uuesti...');
        setTimeout(() => {
            renderPageComments();
        }, 300);
    });

    // Kuula ka popstate (browseri tagasi/edasi nupud)
    window.addEventListener('popstate', function() {
        console.log('🔙 Popstate - laen märkused uuesti');
        setTimeout(() => {
            loadAllComments();
        }, 300);
    });

    // Mutation observer MkDocs'i sisu muutuste jaoks
    const observeContentChanges = () => {
        const targetNode = document.querySelector('.md-content');
        if (!targetNode) {
            console.warn('⚠️ .md-content ei leitud, observer ei tööta');
            return;
        }

        const observer = new MutationObserver((mutations) => {
            // Kontrolli, kas lisati uusi elemente
            for (const mutation of mutations) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    console.log('🔄 DOM muutus tuvastatud, renderin märkused...');
                    setTimeout(() => renderPageComments(), 500);
                    break;
                }
            }
        });

        observer.observe(targetNode, {
            childList: true,
            subtree: true
        });

        console.log('👁️ Mutation observer käivitatud');
    };

    // Käivita observer pärast init
    setTimeout(() => observeContentChanges(), 1000);

    // Käivita kui leht on valmis
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
