const DEFAULT_EXCLUDED_SELECTORS = [
    '.VPNavBarTitle img',
    '.VPHero.VPHomeHero img'
];
const DEFAULT_EXCLUDED_CLASSES = ['link-card-logo'];
function normalizeClassName(className) {
    return className.trim().replace(/^\./, '');
}
function hasClassInTree(image, className) {
    const normalized = normalizeClassName(className);
    if (!normalized)
        return false;
    let element = image;
    while (element) {
        if (element.classList.contains(normalized))
            return true;
        element = element.parentElement;
    }
    return false;
}
function getFileName(image) {
    const source = image.currentSrc || image.src || image.getAttribute('src') || '';
    const decodeFileName = (value) => {
        try {
            return decodeURIComponent(value).toLowerCase();
        }
        catch {
            return value.toLowerCase();
        }
    };
    try {
        const pathname = new URL(source, document.baseURI).pathname;
        return decodeFileName(pathname.split('/').pop() || '');
    }
    catch {
        return decodeFileName(source.split(/[?#]/)[0].split('/').pop() || '');
    }
}
function matchesRules(image, rules) {
    if (!rules)
        return false;
    if (rules.classes?.some(className => hasClassInTree(image, className))) {
        return true;
    }
    const fileName = getFileName(image);
    return rules.fileNames?.some(name => name.trim().toLowerCase() === fileName) ?? false;
}
export function isImageAllowed(image, options = {}) {
    // Explicit inclusions have the highest priority and can restore default exclusions.
    if (matchesRules(image, options.include))
        return true;
    if (image.classList.contains('no-viewer'))
        return false;
    if (options.ignoreLinkedImages !== false && image.closest('a'))
        return false;
    if (DEFAULT_EXCLUDED_CLASSES.some(className => hasClassInTree(image, className))) {
        return false;
    }
    if (DEFAULT_EXCLUDED_SELECTORS.some(selector => image.matches(selector)))
        return false;
    return !matchesRules(image, options.exclude);
}
