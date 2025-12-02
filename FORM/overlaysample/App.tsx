// App.tsx
import React, { useState, useRef, useEffect, useMemo, useCallback, useLayoutEffect } from 'react';
import { 
  Box as BoxIcon, 
  Layers, 
  Code, 
  FolderPlus, 
  Download, 
  Trash2, 
  ChevronRight, 
  ChevronDown,
  Plus,
  Ungroup,
  ZoomIn,
  ZoomOut,
  Maximize,
  Copy,
  ClipboardPaste,
  Undo,
  Redo,
  FileJson,
  EyeOff,
  Eye,
  Magnet,
  CheckSquare,
  Upload,
  Moon,
  Camera,
  Type,
  Underline
} from 'lucide-react';
// @ts-ignore
import { toPng } from 'html-to-image';
import { Box, Group, SelectionState, COLORS } from './types';

// Utility to generate IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

interface HistoryState {
  boxes: Box[];
  groups: Group[];
}

interface SnapLine {
  orientation: 'vertical' | 'horizontal';
  position: number;
}

// Helper to flatten the visible list for keyboard navigation
const getVisibleItems = (boxes: Box[], groups: Group[]) => {
  const items: { id: string, type: 'group' | 'box' }[] = [];
  
  // Groups and their children
  groups.forEach(group => {
    items.push({ id: group.id, type: 'group' });
    if (!group.collapsed) {
      const groupBoxes = boxes.filter(b => b.groupId === group.id);
      groupBoxes.forEach(box => items.push({ id: box.id, type: 'box' }));
    }
  });

  // Ungrouped boxes
  const ungroupedBoxes = boxes.filter(b => !b.groupId);
  ungroupedBoxes.forEach(box => items.push({ id: box.id, type: 'box' }));

  return items;
};

// Component for auto-resizing text
const AutoSizedText = ({ value, boxWidth, color, textShadow }: { value: string, boxWidth: number, color: string, textShadow: string }) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = textRef.current;
    if (!el) return;
    
    // Reset scale to measure true width
    el.style.transform = 'none';
    
    const parentWidth = boxWidth - 4; // -4 for padding/border safety
    const contentWidth = el.scrollWidth;
    
    if (contentWidth > parentWidth && contentWidth > 0) {
      setScale(parentWidth / contentWidth);
    } else {
      setScale(1);
    }
  }, [value, boxWidth]);

  return (
    <div
      ref={textRef}
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'left center',
        color: color,
        textShadow: textShadow,
        fontSize: '12px',
        fontFamily: 'sans-serif',
        fontWeight: 500,
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        width: 'fit-content'
      }}
    >
      {value}
    </div>
  );
};

function App() {
  // --- State ---
  const [htmlInput, setHtmlInput] = useState<string>(`<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<style>
  body { background-color: #333; font-family: sans-serif; color: #eee; margin: 0; padding: 20px; }
  .demo-page { background: white; color: black; width: 800px; height: 1000px; margin: 0 auto; position: relative; box-shadow: 0 4px 6px rgba(0,0,0,0.3); padding: 40px; }
  h1 { color: #2563eb; }
</style>
</head>
<body>
<div class="demo-page">
  <h1>Sample PDF/HTML Content</h1>
  <p>Paste your pdf2htmlEX code or any HTML here.</p>
  <p>This tool allows you to draw zoning boxes on top of complex layouts.</p>
  <div style="position: absolute; top: 500px; left: 100px; border: 1px solid red; padding: 10px;">
    Absolute Positioned Element
  </div>
</div>
</body>
</html>`);
  
  const [outputCode, setOutputCode] = useState<string>('');
  const [outputJson, setOutputJson] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'input' | 'output' | 'json'>('input');
  
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [selection, setSelection] = useState<SelectionState>({ type: null, ids: [] });
  const [lastSelectedId, setLastSelectedId] = useState<string | null>(null); 

  const [clipboard, setClipboard] = useState<{ boxes: Box[], groups: Group[] } | null>(null);
  
  // History State
  const [past, setPast] = useState<HistoryState[]>([]);
  const [future, setFuture] = useState<HistoryState[]>([]);

  // Canvas State
  const [zoomLevel, setZoomLevel] = useState(1);
  const [maskContent, setMaskContent] = useState(false); 
  const [isSnappingEnabled, setIsSnappingEnabled] = useState(true);
  const [forceBlack, setForceBlack] = useState(false);
  const [bottomBorderOnly, setBottomBorderOnly] = useState(false);
  
  // Dragging state (Canvas)
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeHandle, setResizeHandle] = useState<string | null>(null);
  
  // Snapping State
  const [snapLines, setSnapLines] = useState<SnapLine[]>([]);
  
  // Dragging state (Sidebar)
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // --- History Management ---

  const saveHistory = useCallback(() => {
    setPast(prev => [...prev, { boxes, groups }]);
    setFuture([]); 
  }, [boxes, groups]);

  const undo = useCallback(() => {
    if (past.length === 0) return;

    const previous = past[past.length - 1];
    if (!previous || !previous.boxes) return; 

    const newPast = past.slice(0, past.length - 1);

    setFuture(prev => [{ boxes, groups }, ...prev]);
    setBoxes(previous.boxes);
    setGroups(previous.groups);
    setPast(newPast);
  }, [boxes, groups, past]);

  const redo = useCallback(() => {
    if (future.length === 0) return;

    const next = future[0];
    if (!next || !next.boxes) return;

    const newFuture = future.slice(1);

    setPast(prev => [...prev, { boxes, groups }]);
    setBoxes(next.boxes);
    setGroups(next.groups);
    setFuture(newFuture);
  }, [boxes, groups, future]);

  // --- CSS Override for Preview ---
  const cssOverride = `
    <style>
      /* Force containers to flow naturally so overlays match scroll positions */
      html, body { 
        overflow: visible !important; 
        height: auto !important; 
        width: auto !important; 
        margin: 0 !important; 
        padding: 0 !important; 
        background: transparent !important; 
        text-align: left !important;
      }
      
      /* PDF2HTML EX specific overrides */
      #page-container { 
        position: relative !important; 
        overflow: visible !important; 
        height: auto !important; 
        width: auto !important; 
        margin: 0 !important; 
        padding: 0 !important;
        left: 0 !important;
      }
      #sidebar { display: none !important; } 
      .loading-indicator { display: none !important; }
      
      /* Force left alignment on page frames to prevent zoom shifting */
      .pf { 
        margin: 0 !important; 
        box-shadow: none !important; 
        left: 0 !important;
      }
      .pc { margin: 0 !important; }
      
      /* Demo content override */
      .demo-page { 
        margin: 0 !important; 
        box-shadow: none !important; 
        left: 0 !important;
      }

      /* Generic overrides for common centering methods */
      center { text-align: left !important; }
      [align="center"] { text-align: left !important; }

      @media print {
        @page { margin: 0; }
        body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        /* Ensure overlay is visible when printing */
        #overlay-layer div { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      }
    </style>
  `;

  const previewHtml = useMemo(() => {
    if (htmlInput.includes('</head>')) {
      return htmlInput.replace('</head>', `${cssOverride}</head>`);
    }
    return cssOverride + htmlInput;
  }, [htmlInput, cssOverride]);

  // --- Actions ---

  const handleZoom = useCallback((delta: number) => {
    setZoomLevel(prev => Math.max(0.1, Math.min(5, prev + delta)));
  }, []);

  const addBox = () => {
    saveHistory(); 
    let startY = 0;
    let startX = 0;

    if (scrollContainerRef.current) {
      const { scrollTop, scrollLeft, clientHeight, clientWidth } = scrollContainerRef.current;
      startY = (scrollTop + clientHeight / 2) / zoomLevel - 40;
      startX = (scrollLeft + clientWidth / 2) / zoomLevel - 75;
      
      startY = Math.max(0, startY);
      startX = Math.max(0, startX);
    }

    const newBox: Box = {
      id: generateId(),
      x: startX,
      y: startY,
      width: 150,
      height: 80,
      name: `Zone ${boxes.length + 1}`,
      value: '',
      type: 'text',
    };
    setBoxes([...boxes, newBox]);
    setSelection({ type: 'box', ids: [newBox.id] });
    setLastSelectedId(newBox.id);
  };

  const addCheckbox = () => {
    saveHistory(); 
    let startY = 0;
    let startX = 0;

    if (scrollContainerRef.current) {
      const { scrollTop, scrollLeft, clientHeight, clientWidth } = scrollContainerRef.current;
      startY = (scrollTop + clientHeight / 2) / zoomLevel - 10;
      startX = (scrollLeft + clientWidth / 2) / zoomLevel - 10;
      
      startY = Math.max(0, startY);
      startX = Math.max(0, startX);
    }

    const newBox: Box = {
      id: generateId(),
      x: startX,
      y: startY,
      width: 20,
      height: 20,
      name: `Checkbox ${boxes.length + 1}`,
      value: '',
      type: 'checkbox',
    };
    setBoxes([...boxes, newBox]);
    setSelection({ type: 'box', ids: [newBox.id] });
    setLastSelectedId(newBox.id);
  };

  const duplicateBox = (box: Box, side: 'top' | 'bottom' | 'left' | 'right') => {
    saveHistory();
    const newBox: Box = {
      id: generateId(),
      width: box.width,
      height: box.height,
      name: `${box.name} (Copy)`,
      groupId: box.groupId, // Keep group
      x: box.x,
      y: box.y,
      value: box.value,
      type: box.type || (box.width <= 40 && box.height <= 40 ? 'checkbox' : 'text'),
    };

    if (side === 'top') newBox.y = box.y - box.height;
    if (side === 'bottom') newBox.y = box.y + box.height;
    if (side === 'left') newBox.x = box.x - box.width;
    if (side === 'right') newBox.x = box.x + box.width;

    setBoxes(prev => [...prev, newBox]);
    setSelection({ type: 'box', ids: [newBox.id] });
    setLastSelectedId(newBox.id);
  };

  const duplicateSelection = () => {
    if (selection.ids.length === 0) return;
    saveHistory();

    if (selection.type === 'box') {
      const newBoxes = boxes
        .filter(b => selection.ids.includes(b.id))
        .map(b => ({
          ...b,
          id: generateId(),
          x: b.x + 20,
          y: b.y + 20,
          name: `${b.name} (Copy)`
        }));
      setBoxes([...boxes, ...newBoxes]);
      setSelection({ type: 'box', ids: newBoxes.map(b => b.id) });
      if (newBoxes.length > 0) setLastSelectedId(newBoxes[newBoxes.length - 1].id);
    } else if (selection.type === 'group') {
       const newGroups: Group[] = [];
       const newBoxes: Box[] = [];

       selection.ids.forEach(groupId => {
         const originalGroup = groups.find(g => g.id === groupId);
         if (!originalGroup) return;
         
         const newGroupId = generateId();
         newGroups.push({
           ...originalGroup,
           id: newGroupId,
           name: `${originalGroup.name} (Copy)`
         });

         boxes.filter(b => b.groupId === groupId).forEach(b => {
           newBoxes.push({
             ...b,
             id: generateId(),
             groupId: newGroupId,
             x: b.x + 20, 
             y: b.y + 20
           });
         });
       });

       setGroups([...groups, ...newGroups]);
       setBoxes([...boxes, ...newBoxes]);
       setSelection({ type: 'group', ids: newGroups.map(g => g.id) });
       if (newGroups.length > 0) setLastSelectedId(newGroups[newGroups.length - 1].id);
    }
  };

  const createGroup = () => {
    if (selection.type !== 'box' || selection.ids.length === 0) return;
    saveHistory();

    const newGroupId = generateId();
    const newGroup: Group = {
      id: newGroupId,
      name: `Group ${groups.length + 1}`,
      color: COLORS[groups.length % COLORS.length],
      collapsed: false,
    };

    setGroups([...groups, newGroup]);
    setBoxes(boxes.map(b => selection.ids.includes(b.id) ? { ...b, groupId: newGroupId } : b));
    setSelection({ type: 'group', ids: [newGroupId] });
    setLastSelectedId(newGroupId);
  };

  const ungroup = (groupId: string) => {
    saveHistory();
    setBoxes(boxes.map(b => b.groupId === groupId ? { ...b, groupId: undefined } : b));
    setGroups(groups.filter(g => g.id !== groupId));
    setSelection({ type: null, ids: [] });
    setLastSelectedId(null);
  };

  const deleteSelected = () => {
    if (selection.type === null || selection.ids.length === 0) return;
    saveHistory();

    if (selection.type === 'box') {
      setBoxes(boxes.filter(b => !selection.ids.includes(b.id)));
      setSelection({ type: null, ids: [] });
    } else if (selection.type === 'group') {
      const groupIds = selection.ids;
      setBoxes(boxes.filter(b => !b.groupId || !groupIds.includes(b.groupId)));
      setGroups(groups.filter(g => !groupIds.includes(g.id)));
      setSelection({ type: null, ids: [] });
    }
    setLastSelectedId(null);
  };

  // --- Clipboard Logic ---

  const copyToClipboard = () => {
    if (selection.type === 'box') {
      const selectedBoxes = boxes.filter(b => selection.ids.includes(b.id));
      setClipboard({ boxes: selectedBoxes, groups: [] });
    } else if (selection.type === 'group') {
      const selectedGroups = groups.filter(g => selection.ids.includes(g.id));
      const groupBoxes = boxes.filter(b => b.groupId && selection.ids.includes(b.groupId));
      setClipboard({ boxes: groupBoxes, groups: selectedGroups });
    }
  };

  const pasteFromClipboard = () => {
    if (!clipboard) return;
    saveHistory();

    if (clipboard.groups.length > 0) {
      const idMap = new Map<string, string>();
      const newGroups = clipboard.groups.map(g => {
        const newId = generateId();
        idMap.set(g.id, newId);
        return { ...g, id: newId, name: `${g.name} (Paste)` };
      });

      const newBoxes = clipboard.boxes.map(b => ({
        ...b,
        id: generateId(),
        groupId: b.groupId ? idMap.get(b.groupId) : undefined,
        x: b.x + 30,
        y: b.y + 30
      }));

      setGroups([...groups, ...newGroups]);
      setBoxes([...boxes, ...newBoxes]);
      setSelection({ type: 'group', ids: newGroups.map(g => g.id) });

    } else {
      const newBoxes = clipboard.boxes.map(b => ({
        ...b,
        id: generateId(),
        x: b.x + 30,
        y: b.y + 30,
        groupId: undefined
      }));
      setBoxes([...boxes, ...newBoxes]);
      setSelection({ type: 'box', ids: newBoxes.map(b => b.id) });
    }
  };

  const handleDownloadImage = () => {
    if (!contentRef.current) return;

    // 1. Temporarily deselect to hide handles
    const prevSelection = selection;
    setSelection({ type: null, ids: [] });

    // 2. Temporarily reset zoom and set container to fit content to avoid whitespace
    const originalTransform = contentRef.current.style.transform;
    const originalMinWidth = contentRef.current.style.minWidth;
    const originalMinHeight = contentRef.current.style.minHeight;
    const originalWidth = contentRef.current.style.width;
    const originalHeight = contentRef.current.style.height;

    contentRef.current.style.transform = 'scale(1)';
    contentRef.current.style.minWidth = 'auto'; // Allow shrinking
    contentRef.current.style.minHeight = 'auto';
    contentRef.current.style.width = 'fit-content'; // Shrink to PDF content size
    contentRef.current.style.height = 'fit-content';

    // 3. Capture
    // Give a micro-delay for React/DOM to settle if needed, though usually sync style updates work.
    setTimeout(() => {
        toPng(contentRef.current, { 
            cacheBust: true,
            backgroundColor: 'white',
            pixelRatio: 2 // High resolution
        })
        .then(async (dataUrl: string) => {
            // Convert DataURL to Blob
            const res = await fetch(dataUrl);
            const blob = await res.blob();
            
            // Create a temporary object URL
            const blobUrl = URL.createObjectURL(blob);
            
            // Open in new tab
            const newWindow = window.open(blobUrl, '_blank');
            if (!newWindow) {
                alert('Pop-up blocked! Please allow pop-ups to view the image.');
            }
        })
        .catch((err: any) => {
            console.error('Oops, something went wrong!', err);
            alert('Failed to generate image. Please check console.');
        })
        .finally(() => {
            // 4. Restore state
            if (contentRef.current) {
                contentRef.current.style.transform = originalTransform;
                contentRef.current.style.minWidth = originalMinWidth;
                contentRef.current.style.minHeight = originalMinHeight;
                contentRef.current.style.width = originalWidth;
                contentRef.current.style.height = originalHeight;
            }
            setSelection(prevSelection);
        });
    }, 50);
  };

  const handleOpenPreview = () => {
      const code = getFinalHtmlCode();
      const blob = new Blob([code], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
  };

  // Keyboard Shortcuts (Global)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'c') {
          e.preventDefault();
          copyToClipboard();
        } else if (e.key === 'v') {
          e.preventDefault();
          pasteFromClipboard();
        } else if (e.key === 'd') {
          e.preventDefault();
          duplicateSelection();
        } else if (e.key === 'z') {
          e.preventDefault();
          if (e.shiftKey) {
             redo();
          } else {
             undo();
          }
        } else if (e.key === 'y') {
          e.preventDefault();
          redo();
        }
      }
      if (e.key === 'Delete' || e.key === 'Backspace') {
        deleteSelected();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [boxes, groups, selection, clipboard, past, future]);


  // Keyboard Navigation (Sidebar Selection)
  useEffect(() => {
    const handleSidebarNav = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (!selection.type || selection.ids.length === 0) return;
      if (!e.shiftKey) return;

      const visibleItems = getVisibleItems(boxes, groups);
      const focusId = lastSelectedId || selection.ids[selection.ids.length - 1];
      const focusIndex = visibleItems.findIndex(item => item.id === focusId);
      
      if (focusIndex === -1) return;

      let nextIndex = focusIndex;
      if (e.key === 'ArrowUp') {
          e.preventDefault();
          nextIndex = Math.max(0, focusIndex - 1);
      } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          nextIndex = Math.min(visibleItems.length - 1, focusIndex + 1);
      } else {
          return;
      }

      const targetItem = visibleItems[nextIndex];
      
      if (targetItem.type !== selection.type) {
          setSelection({ type: targetItem.type, ids: [targetItem.id] });
      } else {
          let newIds = [...selection.ids];
          if (newIds.includes(targetItem.id)) {
              if (!newIds.includes(targetItem.id)) newIds.push(targetItem.id);
          } else {
              newIds.push(targetItem.id);
          }
          setSelection({ ...selection, ids: newIds });
      }
      setLastSelectedId(targetItem.id);
    };

    window.addEventListener('keydown', handleSidebarNav);
    return () => window.removeEventListener('keydown', handleSidebarNav);
  }, [boxes, groups, selection, lastSelectedId]);

  // Define getFinalHtmlCode outside to be used by both generateOutput and handlePrint
  const getFinalHtmlCode = () => {
    const overlayHtml = boxes.map(box => {
      const group = groups.find(g => g.id === box.groupId);
      const borderColor = forceBlack ? '#000000' : (group ? group.color : '#000000'); 
      const backgroundStyle = maskContent ? '#FFFFFF' : `${borderColor}33`;
      const textColor = maskContent ? '#000000' : (forceBlack ? '#000000' : borderColor); // Match text color to box/theme
      const boxValue = box.value || '';
      
      const isCheckbox = box.type === 'checkbox' || (!box.type && box.width <= 40 && box.height <= 40);
      const borderStyle = (bottomBorderOnly && !isCheckbox) 
          ? `border: none; border-bottom: 2px solid ${borderColor};` 
          : `border: 2px solid ${borderColor};`;

      return `  <div id="${box.id}" title="${box.name} (${group?.name || 'Ungrouped'})" style="position: absolute; left: ${Math.round(box.x)}px; top: ${Math.round(box.y)}px; width: ${Math.round(box.width)}px; height: ${Math.round(box.height)}px; ${borderStyle} background-color: ${backgroundStyle}; z-index: 9999; box-sizing: border-box; display: flex; align-items: center; justify-content: flex-start; padding-left: 2px; overflow: hidden; font-family: sans-serif; font-size: 12px; font-weight: 500; color: ${textColor};">
        <div class="overlay-box-value" style="white-space: nowrap; transform-origin: left center;">${boxValue}</div>
      </div>`;
    }).join('\n');

    let finalHtml = htmlInput;
    
    const cssContent = `
      /* Generated Overlay Fixes */
      html, body { 
        margin: 0 !important; 
        padding: 0 !important; 
        overflow: auto !important;
        position: relative !important; 
        height: auto !important;
        width: auto !important;
      }
      #page-container, .pf, .pc, .demo-page {
        margin: 0 !important;
        left: 0 !important;
        top: 0 !important;
        box-shadow: none !important;
        position: relative !important;
      }
      #sidebar { display: none !important; }
      
      @media print {
         @page { margin: 0; }
         body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      }
    `;

    // Script to handle auto-resizing on load/resize
    const resizeScript = `
    <script>
      (function() {
        function resizeBoxes() {
          var boxes = document.querySelectorAll('.overlay-box-value');
          boxes.forEach(function(el) {
            var parent = el.parentElement;
            if (!parent) return;
            
            el.style.transform = 'none';
            var parentWidth = parent.clientWidth - 4; // Padding buffer
            var contentWidth = el.scrollWidth;
            
            if (contentWidth > parentWidth && contentWidth > 0) {
               var scale = parentWidth / contentWidth;
               el.style.transform = 'scale(' + scale + ')';
            }
          });
        }
        window.addEventListener('load', resizeBoxes);
        window.addEventListener('resize', resizeBoxes);
      })();
    </script>
    `;

    if (finalHtml.includes('</head>')) {
        finalHtml = finalHtml.replace('</head>', `<style>${cssContent}</style></head>`);
    } else {
        finalHtml = `<style>${cssContent}</style>` + finalHtml;
    }

    const wrapper = `
    <div id="overlay-layer" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: visible; pointer-events: none; z-index: 10000;">
${overlayHtml}
    </div>`;

    const bodyCloseIndex = finalHtml.lastIndexOf('</body>');
    if (bodyCloseIndex > -1) {
        finalHtml = finalHtml.slice(0, bodyCloseIndex) + wrapper + resizeScript + '\n</body>' + finalHtml.slice(bodyCloseIndex + 7);
    } else {
        finalHtml += wrapper + resizeScript;
    }
    
    return finalHtml;
  };

  const generateOutput = () => {
    setOutputCode(getFinalHtmlCode());

    // 2. Generate JSON Data
    const jsonStructure: any = {
        maskContent,
        bottomBorderOnly,
        groups: groups.map(g => ({
            id: g.id,
            name: g.name,
            color: forceBlack ? '#000000' : g.color, 
            boxes: boxes
                .filter(b => b.groupId === g.id)
                .map(b => ({
                    id: b.id,
                    name: b.name,
                    x: Math.round(b.x),
                    y: Math.round(b.y),
                    width: Math.round(b.width),
                    height: Math.round(b.height),
                    value: b.value || "",
                    type: b.type || (b.width <= 40 && b.height <= 40 ? 'checkbox' : 'text')
                }))
        })),
        ungrouped: boxes
            .filter(b => !b.groupId)
            .map(b => ({
                id: b.id,
                name: b.name,
                x: Math.round(b.x),
                y: Math.round(b.y),
                width: Math.round(b.width),
                height: Math.round(b.height),
                value: b.value || "",
                type: b.type || (b.width <= 40 && b.height <= 40 ? 'checkbox' : 'text')
            }))
    };

    setOutputJson(JSON.stringify(jsonStructure, null, 2));
    
    if (activeTab === 'input') setActiveTab('output');
  };

  const importFromJson = () => {
      try {
          if (!outputJson.trim()) {
              alert("Please paste JSON content into the text area before importing.");
              return;
          }

          const data = JSON.parse(outputJson);
          if (!data || typeof data !== 'object') throw new Error("Invalid JSON");

          saveHistory();
          
          if (typeof data.maskContent === 'boolean') setMaskContent(data.maskContent);
          if (typeof data.bottomBorderOnly === 'boolean') setBottomBorderOnly(data.bottomBorderOnly);

          const newGroups: Group[] = [];
          const newBoxes: Box[] = [];

          if (data.groups && Array.isArray(data.groups)) {
              data.groups.forEach((g: any) => {
                  const groupId = g.id || generateId();
                  newGroups.push({
                      id: groupId,
                      name: g.name || "Imported Group",
                      color: g.color || COLORS[0],
                      collapsed: false
                  });

                  if (g.boxes && Array.isArray(g.boxes)) {
                      g.boxes.forEach((b: any) => {
                          newBoxes.push({
                              id: b.id || generateId(),
                              name: b.name || "Imported Zone",
                              x: b.x || 0,
                              y: b.y || 0,
                              width: b.width || 100,
                              height: b.height || 50,
                              groupId: groupId,
                              value: b.value !== undefined ? b.value : "",
                              type: b.type || (b.width && b.width <= 40 && b.height && b.height <= 40 ? 'checkbox' : 'text')
                          });
                      });
                  }
              });
          }

          if (data.ungrouped && Array.isArray(data.ungrouped)) {
              data.ungrouped.forEach((b: any) => {
                  newBoxes.push({
                      id: b.id || generateId(),
                      name: b.name || "Imported Zone",
                      x: b.x || 0,
                      y: b.y || 0,
                      width: b.width || 100,
                      height: b.height || 50,
                      value: b.value !== undefined ? b.value : "",
                      type: b.type || (b.width && b.width <= 40 && b.height && b.height <= 40 ? 'checkbox' : 'text')
                  });
              });
          }

          setGroups(newGroups);
          setBoxes(newBoxes);
          alert("Import successful! Loaded " + newBoxes.length + " boxes in " + newGroups.length + " groups.");
      } catch (e) {
          alert("Failed to import JSON: " + (e as Error).message);
      }
  };

  // --- Interaction Handlers ---
  
  const stateBeforeInteraction = useRef<HistoryState | null>(null);
  const currentStateRef = useRef<HistoryState>({ boxes, groups });
  
  useEffect(() => {
    currentStateRef.current = { boxes, groups };
  }, [boxes, groups]);

  const handleCanvasMouseDown = (e: React.MouseEvent, id: string, type: 'box' | 'resize', handle?: string) => {
    e.stopPropagation();
    
    if (!stateBeforeInteraction.current) {
        stateBeforeInteraction.current = { ...currentStateRef.current };
    }
    
    let newSelectionIds = selection.ids;
    
    if (type === 'box') {
        if (e.ctrlKey || e.metaKey || e.shiftKey) {
            if (selection.type === 'box') {
                if (newSelectionIds.includes(id)) {
                    newSelectionIds = newSelectionIds.filter(i => i !== id);
                } else {
                    newSelectionIds = [...newSelectionIds, id];
                }
            } else {
                newSelectionIds = [id];
            }
        } else {
            if (!newSelectionIds.includes(id)) {
                 newSelectionIds = [id];
            }
        }
        
        setSelection({ type: 'box', ids: newSelectionIds });
        setLastSelectedId(id);
        
        if (newSelectionIds.includes(id)) {
            setIsDragging(true);
            setDragStart({ x: e.clientX, y: e.clientY });
        }

    } else if (type === 'resize') {
      setIsResizing(true);
      setResizeHandle(handle || null);
      setDragStart({ x: e.clientX, y: e.clientY });
      
      if (!selection.ids.includes(id)) {
          setSelection({ type: 'box', ids: [id] });
      }
      
      setLastSelectedId(id);
    }
  };

  const handleSidebarItemClick = (e: React.MouseEvent, id: string, type: 'box' | 'group') => {
      e.stopPropagation();
      let newIds = selection.ids;
      
      if (e.shiftKey && lastSelectedId && selection.type === type) {
          const visibleItems = getVisibleItems(boxes, groups).filter(i => i.type === type);
          const startIdx = visibleItems.findIndex(i => i.id === lastSelectedId);
          const endIdx = visibleItems.findIndex(i => i.id === id);
          
          if (startIdx !== -1 && endIdx !== -1) {
              const range = visibleItems.slice(Math.min(startIdx, endIdx), Math.max(startIdx, endIdx) + 1).map(i => i.id);
              newIds = Array.from(new Set([...newIds, ...range]));
          }
      } else if (e.ctrlKey || e.metaKey) {
          if (selection.type === type) {
              if (newIds.includes(id)) {
                  newIds = newIds.filter(i => i !== id);
              } else {
                  newIds = [...newIds, id];
              }
          } else {
              newIds = [id];
          }
          setLastSelectedId(id);
      } else {
          newIds = [id];
          setLastSelectedId(id);
      }
      
      setSelection({ type, ids: newIds });
  };

  const getSnappedPosition = (
    targetIds: string[], 
    dx: number, dy: number, 
    currentBoxes: Box[], 
    allBoxes: Box[]
  ) => {
    if (!isSnappingEnabled) return { dx, dy, lines: [] };

    const activeBox = currentBoxes.find(b => b.id === lastSelectedId);
    if (!activeBox) return { dx, dy, lines: [] };

    const SNAP_THRESHOLD = 5;
    const candidates = allBoxes.filter(b => !targetIds.includes(b.id));

    let newX = activeBox.x + dx;
    let newY = activeBox.y + dy;
    let snappedX = newX;
    let snappedY = newY;
    
    const lines: SnapLine[] = [];

    const checkX = [newX, newX + activeBox.width / 2, newX + activeBox.width];
    const checkY = [newY, newY + activeBox.height / 2, newY + activeBox.height];

    let diffX = Infinity;
    let diffY = Infinity;

    candidates.forEach(target => {
       const targetX = [target.x, target.x + target.width / 2, target.x + target.width];
       const targetY = [target.y, target.y + target.height / 2, target.y + target.height];

       checkX.forEach((cx, ci) => {
         targetX.forEach(tx => {
           if (Math.abs(cx - tx) < SNAP_THRESHOLD && Math.abs(cx - tx) < Math.abs(diffX)) {
             diffX = tx - cx;
             snappedX = newX + diffX;
             lines.push({ orientation: 'vertical', position: tx });
           }
         });
       });

       checkY.forEach((cy, ci) => {
         targetY.forEach(ty => {
           if (Math.abs(cy - ty) < SNAP_THRESHOLD && Math.abs(cy - ty) < Math.abs(diffY)) {
             diffY = ty - cy;
             snappedY = newY + diffY;
             lines.push({ orientation: 'horizontal', position: ty });
           }
         });
       });
    });

    const finalDx = (Math.abs(diffX) < SNAP_THRESHOLD) ? dx + diffX : dx;
    const finalDy = (Math.abs(diffY) < SNAP_THRESHOLD) ? dy + diffY : dy;
    
    const activeLines = lines.filter(l => 
        (l.orientation === 'vertical' && Math.abs(diffX) < SNAP_THRESHOLD) || 
        (l.orientation === 'horizontal' && Math.abs(diffY) < SNAP_THRESHOLD)
    );

    return { dx: finalDx, dy: finalDy, lines: activeLines };
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (!isDragging && !isResizing) return;
    
    const rawDx = (e.clientX - dragStart.x) / zoomLevel;
    const rawDy = (e.clientY - dragStart.y) / zoomLevel;
    
    // Always sync move for selected items. Sync resize if multi-selected.
    const isMulti = selection.ids.length > 1;
    const moveTargetIds = selection.ids;
    const resizeTargetIds = selection.ids; // Always resize all selected boxes

    let finalDx = rawDx;
    let finalDy = rawDy;
    let lines: SnapLine[] = [];

    if (lastSelectedId && (isDragging || isResizing)) {
        const snapResult = getSnappedPosition(
            isDragging ? moveTargetIds : resizeTargetIds,
            rawDx, rawDy,
            boxes,
            boxes 
        );
        
        finalDx = snapResult.dx;
        finalDy = snapResult.dy;
        lines = snapResult.lines;
    }
    
    setSnapLines(lines);

    if (isDragging && selection.type === 'box') {
      setBoxes(prevBoxes => prevBoxes.map(b => {
        if (selection.ids.includes(b.id)) {
          return { ...b, x: b.x + finalDx, y: b.y + finalDy };
        }
        return b;
      }));
      setDragStart({ x: e.clientX, y: e.clientY });
    } 
    else if (isResizing && resizeHandle) {
       setBoxes(prevBoxes => prevBoxes.map(b => {
        if (resizeTargetIds.includes(b.id)) {
          let newBox = { ...b };
          if (resizeHandle!.includes('e')) newBox.width = Math.max(1, b.width + finalDx);
          if (resizeHandle!.includes('s')) newBox.height = Math.max(1, b.height + finalDy);
          return newBox;
        }
        return b;
      }));
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };
  
  // Fix: Attach wheel listener to the container with passive: false
  // to ensure we can prevent the default browser zoom.
  useEffect(() => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const onWheel = (e: WheelEvent) => {
          if (e.ctrlKey || e.metaKey) {
              e.preventDefault();
              e.stopPropagation(); // Stop propagation to document
              const delta = e.deltaY > 0 ? -0.1 : 0.1;
              handleZoom(delta);
          }
      };

      container.addEventListener('wheel', onWheel, { passive: false });
      return () => container.removeEventListener('wheel', onWheel);
  }, [handleZoom]);

  const handleMouseUp = useCallback(() => {
    if (isDragging || isResizing) {
        setIsDragging(false);
        setIsResizing(false);
        setResizeHandle(null);
        setSnapLines([]); 
        
        if (stateBeforeInteraction.current) {
            const previous = stateBeforeInteraction.current;
            const current = currentStateRef.current;
            
            if (JSON.stringify(previous) !== JSON.stringify(current)) {
                setPast(prev => [...prev, previous]);
                setFuture([]);
            }
            stateBeforeInteraction.current = null;
        }
    }
  }, [isDragging, isResizing]);

  // --- Drag and Drop Sidebar ---
  const handleDragStart = (e: React.DragEvent, id: string) => {
      setDraggedItemId(id);
      e.dataTransfer.effectAllowed = "move";
  };

  const handleDropOnGroup = (e: React.DragEvent, targetGroupId: string) => {
      e.preventDefault();
      if (!draggedItemId) return;

      const box = boxes.find(b => b.id === draggedItemId);
      if (box && box.groupId !== targetGroupId) {
          saveHistory();
          setBoxes(boxes.map(b => b.id === draggedItemId ? { ...b, groupId: targetGroupId } : b));
      }
      setDraggedItemId(null);
  };
  
  const handleDropOnUngrouped = (e: React.DragEvent) => {
      e.preventDefault();
      if (!draggedItemId) return;
      const box = boxes.find(b => b.id === draggedItemId);
      if (box && box.groupId) {
          saveHistory();
          setBoxes(boxes.map(b => b.id === draggedItemId ? { ...b, groupId: undefined } : b));
      }
      setDraggedItemId(null);
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseUp]);

  // --- Helper Components ---

  const ResizeHandle = ({ boxId, zoom }: { boxId: string, zoom: number }) => (
    <div 
      className="absolute bottom-0 right-0 w-4 h-4 bg-white border border-black cursor-se-resize z-50 pointer-events-auto shadow-sm origin-bottom-right"
      style={{ transform: `scale(${1 / zoom})` }}
      onMouseDown={(e) => handleCanvasMouseDown(e, boxId, 'resize', 'se')}
    />
  );

  const DuplicationHandles = ({ box, zoom }: { box: Box, zoom: number }) => {
    const btnClass = "absolute w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-blue-600 transition-all cursor-pointer pointer-events-auto z-50 flex-shrink-0";
    const offset = 12 / zoom;
    const scaleStyle = `scale(${1/zoom})`;

    return (
      <>
        <div className={btnClass} style={{ top: 0, left: '50%', transform: `translate(-50%, -50%) translateY(-${offset}px) ${scaleStyle}` }}
          onMouseDown={(e) => { e.stopPropagation(); duplicateBox(box, 'top'); }} title="Duplicate Top">
          <Plus size={14} strokeWidth={3} />
        </div>
        <div className={btnClass} style={{ bottom: 0, left: '50%', transform: `translate(-50%, 50%) translateY(${offset}px) ${scaleStyle}` }}
          onMouseDown={(e) => { e.stopPropagation(); duplicateBox(box, 'bottom'); }} title="Duplicate Bottom">
          <Plus size={14} strokeWidth={3} />
        </div>
        <div className={btnClass} style={{ top: '50%', left: 0, transform: `translate(-50%, -50%) translateX(-${offset}px) ${scaleStyle}` }}
          onMouseDown={(e) => { e.stopPropagation(); duplicateBox(box, 'left'); }} title="Duplicate Left">
          <Plus size={14} strokeWidth={3} />
        </div>
        <div className={btnClass} style={{ top: '50%', right: 0, transform: `translate(50%, -50%) translateX(${offset}px) ${scaleStyle}` }}
          onMouseDown={(e) => { e.stopPropagation(); duplicateBox(box, 'right'); }} title="Duplicate Right">
          <Plus size={14} strokeWidth={3} />
        </div>
      </>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-gray-100 font-sans overflow-hidden">
      
      {/* Header */}
      <header className="h-14 border-b border-gray-800 flex items-center justify-between px-4 bg-gray-900 shrink-0 z-50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600/20 rounded-lg">
            <Layers className="text-blue-500" size={20} />
          </div>
          <h1 className="font-bold text-lg tracking-tight text-gray-200">HTML Overlay Editor</h1>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Undo/Redo */}
          <div className="flex gap-1">
             <button onClick={undo} disabled={past.length === 0} className="p-2 hover:bg-gray-800 rounded text-gray-400 hover:text-white disabled:opacity-30" title="Undo (Ctrl+Z)">
               <Undo size={18} />
             </button>
             <button onClick={redo} disabled={future.length === 0} className="p-2 hover:bg-gray-800 rounded text-gray-400 hover:text-white disabled:opacity-30" title="Redo (Ctrl+Y)">
               <Redo size={18} />
             </button>
          </div>

          <div className="h-6 w-px bg-gray-800 mx-2"></div>

          {/* Zoom & Mask Controls */}
          <div className="flex items-center bg-gray-800 rounded-md border border-gray-700 p-0.5">
            <button onClick={() => handleZoom(-0.1)} className="p-1.5 hover:bg-gray-700 rounded text-gray-400 hover:text-white">
              <ZoomOut size={16} />
            </button>
            <span className="w-12 text-center text-xs font-mono text-gray-300">{Math.round(zoomLevel * 100)}%</span>
            <button onClick={() => handleZoom(0.1)} className="p-1.5 hover:bg-gray-700 rounded text-gray-400 hover:text-white">
              <ZoomIn size={16} />
            </button>
            <button onClick={() => setZoomLevel(1)} className="p-1.5 ml-1 border-l border-gray-700 hover:bg-gray-700 rounded text-gray-400 hover:text-white" title="Reset Zoom">
              <Maximize size={14} />
            </button>
            
            <div className="w-px h-4 bg-gray-700 mx-1"></div>
            
            <button 
              onClick={() => setIsSnappingEnabled(!isSnappingEnabled)} 
              className={`p-1.5 rounded transition-colors ${isSnappingEnabled ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-400 hover:text-white'}`}
              title={isSnappingEnabled ? "Snapping: ON" : "Snapping: OFF"}
            >
              <Magnet size={16} />
            </button>

            <button 
              onClick={() => setMaskContent(!maskContent)} 
              className={`p-1.5 rounded transition-colors ${maskContent ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-400 hover:text-white'}`}
              title={maskContent ? "Content Masking: ON (White Background)" : "Content Masking: OFF (Transparent)"}
            >
              {maskContent ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>

            <button 
              onClick={() => setForceBlack(!forceBlack)} 
              className={`p-1.5 rounded transition-colors ${forceBlack ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-400 hover:text-white'}`}
              title={forceBlack ? "Force Black Borders: ON" : "Force Black Borders: OFF"}
            >
              <Moon size={16} />
            </button>

            <button 
              onClick={() => setBottomBorderOnly(!bottomBorderOnly)} 
              className={`p-1.5 rounded transition-colors ${bottomBorderOnly ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-400 hover:text-white'}`}
              title={bottomBorderOnly ? "Bottom Border Only: ON" : "Bottom Border Only: OFF"}
            >
              <Underline size={16} />
            </button>
            
            <button 
              onClick={handleDownloadImage} 
              className="p-1.5 rounded hover:bg-gray-700 text-gray-400 hover:text-white ml-1"
              title="Download as Image"
            >
              <Camera size={16} />
            </button>

            <button 
              onClick={handleOpenPreview} 
              className="p-1.5 rounded hover:bg-gray-700 text-gray-400 hover:text-white ml-1"
              title="Preview in New Tab"
            >
              <Eye size={16} />
            </button>
          </div>

          <div className="h-6 w-px bg-gray-800 mx-2"></div>
          
          {/* Clipboard Controls */}
          <div className="flex gap-1">
             <button onClick={copyToClipboard} className="p-2 hover:bg-gray-800 rounded text-gray-400 hover:text-white" title="Copy (Ctrl+C)">
               <Copy size={18} />
             </button>
             <button onClick={pasteFromClipboard} disabled={!clipboard} className="p-2 hover:bg-gray-800 rounded text-gray-400 hover:text-white disabled:opacity-30" title="Paste (Ctrl+V)">
               <ClipboardPaste size={18} />
             </button>
          </div>

          <div className="h-6 w-px bg-gray-800 mx-2"></div>

          <div className="flex gap-3">
            <button 
              onClick={addBox}
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 px-3 py-1.5 rounded-md text-sm transition-all hover:shadow-lg active:translate-y-0.5"
            >
              <Plus size={16} /> Add Box
            </button>
            <button 
              onClick={addCheckbox}
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 px-3 py-1.5 rounded-md text-sm transition-all hover:shadow-lg active:translate-y-0.5"
            >
              <CheckSquare size={16} /> Add Checkbox
            </button>
            <button 
              onClick={generateOutput}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-all hover:shadow-lg shadow-blue-900/20 active:translate-y-0.5"
            >
              <Download size={16} /> Generate
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* LEFT SIDEBAR: Layers */}
        <aside className="w-72 bg-gray-900 border-r border-gray-800 flex flex-col shrink-0 z-40">
          <div className="p-3 border-b border-gray-800 flex justify-between items-center bg-gray-900/50">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Layers & Groups</span>
            <div className="flex gap-1">
              <button 
                onClick={createGroup} 
                title="Group Selected" 
                disabled={selection.type !== 'box'}
                className="p-1.5 hover:bg-gray-800 rounded text-gray-400 hover:text-blue-400 disabled:opacity-30 transition-colors"
              >
                <FolderPlus size={16} />
              </button>
              <button 
                onClick={deleteSelected} 
                title="Delete Selected" 
                disabled={selection.type === null}
                className="p-1.5 hover:bg-red-900/30 rounded text-gray-400 hover:text-red-400 disabled:opacity-30 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 space-y-3 select-none">
            {/* Groups List */}
            {groups.map(group => {
              const isGroupSelected = selection.type === 'group' && selection.ids.includes(group.id);
              return (
              <div 
                key={group.id} 
                className={`border rounded-lg overflow-hidden transition-colors ${isGroupSelected ? 'border-blue-500/50 bg-blue-900/10' : 'border-gray-800 bg-gray-800/30'}`}
                onDragOver={(e) => e.preventDefault()} // Allow Drop
                onDrop={(e) => handleDropOnGroup(e, group.id)}
              >
                <div 
                  className={`flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-800 transition-colors`}
                  onClick={(e) => handleSidebarItemClick(e, group.id, 'group')}
                >
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setGroups(groups.map(g => g.id === group.id ? { ...g, collapsed: !g.collapsed } : g));
                    }}
                    className="p-0.5 text-gray-500 hover:text-white transition-colors"
                  >
                    {group.collapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
                  </button>
                  <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: group.color }} />
                  <input 
                    className="bg-transparent border-none text-sm w-full text-gray-300 focus:text-white focus:outline-none px-1 placeholder-gray-600 focus:bg-gray-800/50 rounded"
                    value={group.name}
                    onChange={(e) => {
                        setGroups(groups.map(g => g.id === group.id ? { ...g, name: e.target.value } : g));
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <button onClick={() => ungroup(group.id)} title="Ungroup" className="ml-auto text-gray-600 hover:text-white p-1">
                    <Ungroup size={12}/>
                  </button>
                </div>
                
                {!group.collapsed && (
                  <div className="px-2 pb-2 pt-0 space-y-1">
                    {boxes.filter(b => b.groupId === group.id).map(box => (
                      <div 
                        key={box.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, box.id)}
                        className={`flex flex-col rounded-md cursor-pointer transition-all ${selection.ids.includes(box.id) ? 'bg-blue-600/20 text-blue-200' : 'hover:bg-gray-800 text-gray-400'}`}
                        onClick={(e) => handleSidebarItemClick(e, box.id, 'box')}
                      >
                         <div className="flex items-center gap-2 pl-6 p-1.5">
                            {box.type === 'checkbox' ? <CheckSquare size={12} className="shrink-0" /> : <BoxIcon size={12} className="shrink-0" />}
                            <input 
                                className="bg-transparent border-none w-full focus:outline-none focus:text-white truncate text-xs"
                                value={box.name}
                                onChange={(e) => setBoxes(boxes.map(b => b.id === box.id ? { ...b, name: e.target.value } : b))}
                                onClick={(e) => e.stopPropagation()} 
                                placeholder="Name"
                            />
                         </div>
                         <div className="flex items-center gap-2 pl-9 pr-2 pb-1.5">
                             <Type size={10} className="text-gray-600 shrink-0" />
                             <input 
                                className="bg-transparent border-b border-gray-700/50 w-full focus:outline-none focus:text-white focus:border-blue-500/50 truncate text-[10px] text-gray-500 hover:text-gray-300 transition-colors pb-0.5"
                                value={box.value || ''}
                                onChange={(e) => setBoxes(boxes.map(b => b.id === box.id ? { ...b, value: e.target.value } : b))}
                                onClick={(e) => e.stopPropagation()} 
                                placeholder="Value..."
                            />
                         </div>
                      </div>
                    ))}
                    {boxes.filter(b => b.groupId === group.id).length === 0 && (
                       <div className="pl-8 text-[10px] text-gray-600 py-1 italic">Drop items here</div>
                    )}
                  </div>
                )}
              </div>
            )})}

            {/* Ungrouped Items Area */}
            <div 
                className="space-y-1 min-h-[50px]"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDropOnUngrouped}
            >
               {boxes.filter(b => !b.groupId).length > 0 && <div className="text-xs font-semibold text-gray-600 px-1 mt-4 mb-2 uppercase tracking-wider">Ungrouped</div>}
               {boxes.filter(b => !b.groupId).map(box => (
                <div 
                  key={box.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, box.id)}
                  className={`flex flex-col rounded-md border border-transparent cursor-pointer transition-all ${selection.ids.includes(box.id) ? 'bg-blue-600/20 text-blue-200 border-blue-500/30' : 'hover:bg-gray-800 text-gray-300 hover:border-gray-700'}`}
                  onClick={(e) => handleSidebarItemClick(e, box.id, 'box')}
                >
                    <div className="flex items-center gap-2 p-2 pb-0.5">
                        {box.type === 'checkbox' ? <CheckSquare size={14} className="shrink-0" /> : <BoxIcon size={14} className="shrink-0" />}
                        <input 
                          className="bg-transparent border-none w-full focus:outline-none focus:text-white text-sm"
                          value={box.name}
                          onChange={(e) => setBoxes(boxes.map(b => b.id === box.id ? { ...b, name: e.target.value } : b))}
                          onClick={(e) => e.stopPropagation()}
                          placeholder="Name"
                        />
                    </div>
                    <div className="flex items-center gap-2 px-2 pb-2 pl-7">
                        <Type size={10} className="text-gray-600 shrink-0" />
                        <input 
                            className="bg-transparent border-b border-gray-700/50 w-full focus:outline-none focus:text-white focus:border-blue-500/50 truncate text-[11px] text-gray-500 hover:text-gray-300 transition-colors pb-0.5"
                            value={box.value || ''}
                            onChange={(e) => setBoxes(boxes.map(b => b.id === box.id ? { ...b, value: e.target.value } : b))}
                            onClick={(e) => e.stopPropagation()} 
                            placeholder="Value..."
                        />
                    </div>
                </div>
               ))}
               {boxes.filter(b => !b.groupId).length === 0 && groups.length > 0 && (
                   <div className="text-[10px] text-gray-600 py-4 text-center border-t border-dashed border-gray-800 mt-4">Drag here to ungroup</div>
               )}
            </div>
            
            {boxes.length === 0 && (
              <div className="flex flex-col items-center justify-center h-40 text-gray-600 text-sm">
                <BoxIcon size={32} className="mb-2 opacity-20" />
                <p>No boxes yet</p>
                <p className="text-xs opacity-60">Click "Add Box" to begin</p>
              </div>
            )}
          </div>
        </aside>

        {/* CENTER: Preview Canvas */}
        <main className="flex-1 bg-gray-950 relative flex flex-col min-w-0">
          {/* Scroll Container */}
          <div 
            ref={scrollContainerRef}
            className="flex-1 overflow-auto relative custom-scrollbar"
            onMouseMove={handleCanvasMouseMove}
            onMouseDown={(e) => {
                if (e.target === e.currentTarget || e.target === contentRef.current) {
                    setSelection({ type: null, ids: [] });
                    setLastSelectedId(null);
                }
            }}
          >
             <div 
               ref={contentRef}
               className="relative origin-top-left inline-block align-top bg-white transition-transform duration-75 ease-linear"
               style={{ 
                 transform: `scale(${zoomLevel})`,
                 minWidth: '100%', 
                 minHeight: '100%'
               }}
             >
               {/* 1. HTML Render Layer */}
               <div 
                 className="relative z-0"
                 dangerouslySetInnerHTML={{ __html: previewHtml }}
               />
               
               {/* 2. Overlay Editor Layer */}
               <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                 {/* Snap Guidelines */}
                 {snapLines.map((line, i) => (
                   <div 
                     key={i}
                     className={`absolute bg-blue-500 z-50 ${line.orientation === 'vertical' ? 'w-px h-full top-0' : 'h-px w-full left-0'}`}
                     style={{ 
                       [line.orientation === 'vertical' ? 'left' : 'top']: line.position,
                       opacity: 0.6
                     }}
                   />
                 ))}

                 {boxes.map(box => {
                   const isSelected = selection.ids.includes(box.id);
                   const group = groups.find(g => g.id === box.groupId);
                   const color = forceBlack ? '#000000' : (group ? group.color : '#000000'); 
                   const backgroundColor = maskContent ? 'white' : (isSelected ? `${color}40` : `${color}10`);
                   const opacity = maskContent ? 1 : undefined;

                   // Determine text color for the box value
                   // If forced black or white background (masked), use black.
                   // Otherwise try to use group color or default to something legible.
                   const textColor = (forceBlack || maskContent) ? '#000000' : (group ? group.color : '#ffffff');
                   const textShadow = maskContent ? 'none' : '0px 0px 2px rgba(0,0,0,0.8), 0px 0px 4px rgba(0,0,0,0.5)';

                   // Handle bottom-border-only logic
                   // Heuristic fallback for legacy imported boxes without 'type': checks if it looks small like a checkbox
                   const isCheckbox = box.type === 'checkbox' || (!box.type && box.width <= 40 && box.height <= 40);
                   const isTextOnlyMode = bottomBorderOnly && !isCheckbox;
                   
                   return (
                     <div
                        key={box.id}
                        onMouseDown={(e) => handleCanvasMouseDown(e, box.id, 'box')}
                        style={{
                          position: 'absolute',
                          left: box.x,
                          top: box.y,
                          width: box.width,
                          height: box.height,
                          borderColor: color,
                          backgroundColor: backgroundColor,
                          opacity: opacity,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          paddingLeft: '4px',
                          borderStyle: 'solid',
                          borderWidth: isTextOnlyMode ? '0 0 2px 0' : '2px', // 2px solid bottom only if mode active
                        }}
                        className={`cursor-grab active:cursor-grabbing pointer-events-auto group hover:z-50 ${isSelected ? 'z-40 ring-1 ring-white shadow-lg' : 'z-20'}`}
                     >
                        {/* Inner Value Text - using auto-resize component */}
                        {box.value && (
                           <AutoSizedText 
                              value={box.value}
                              boxWidth={box.width}
                              color={textColor}
                              textShadow={textShadow}
                           />
                        )}

                       {/* Box Name Label */}
                       <div 
                        className="absolute -top-7 left-0 text-white text-xs px-2 py-1 rounded-t shadow-md whitespace-nowrap font-medium pointer-events-none transition-opacity opacity-0 group-hover:opacity-100 origin-bottom-left"
                        style={{ 
                          backgroundColor: color,
                          transform: `scale(${1/zoomLevel})` 
                        }}
                       >
                         {box.name}
                       </div>
                       
                       {/* Only show resize handle if selected */}
                       {isSelected && <ResizeHandle boxId={box.id} zoom={zoomLevel} />}
                       
                       {/* Duplication Handles - Visible on Hover */}
                       <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <DuplicationHandles box={box} zoom={zoomLevel} />
                       </div>
                     </div>
                   );
                 })}
               </div>
             </div>
          </div>
        </main>

        {/* RIGHT: Input/Output Tabs */}
        <aside className="w-96 bg-gray-900 border-l border-gray-800 flex flex-col shrink-0 z-40 shadow-xl">
          <div className="flex border-b border-gray-800 items-center pr-2">
             <button 
               className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'input' ? 'text-blue-400 border-b-2 border-blue-500 bg-gray-800/50' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'}`}
               onClick={() => setActiveTab('input')}
             >
               <div className="flex items-center justify-center gap-2">
                 <Code size={14} /> HTML Input
               </div>
             </button>
             <button 
               className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'output' ? 'text-green-400 border-b-2 border-green-500 bg-gray-800/50' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'}`}
               onClick={() => setActiveTab('output')}
             >
               <div className="flex items-center justify-center gap-2">
                 <Download size={14} /> Generated Code
               </div>
             </button>
             <button 
               className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'json' ? 'text-yellow-400 border-b-2 border-yellow-500 bg-gray-800/50' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'}`}
               onClick={() => setActiveTab('json')}
             >
               <div className="flex items-center justify-center gap-2">
                 <FileJson size={14} /> JSON Output
               </div>
             </button>
             {activeTab === 'json' && (
                 <button 
                    onClick={importFromJson} 
                    className="p-1.5 bg-yellow-600/30 text-yellow-400 hover:bg-yellow-600/50 rounded ml-2 transition-colors"
                    title="Import from JSON"
                 >
                    <Upload size={16} />
                 </button>
             )}
          </div>

          <div className="flex-1 relative">
            {activeTab === 'input' ? (
              <textarea
                className="absolute inset-0 w-full h-full bg-gray-900 p-4 text-xs font-mono text-gray-300 resize-none focus:outline-none focus:bg-gray-800/50 transition-colors leading-relaxed"
                placeholder="Paste your HTML here (e.g. from pdf2htmlEX)..."
                value={htmlInput}
                onChange={(e) => setHtmlInput(e.target.value)}
                spellCheck={false}
              />
            ) : activeTab === 'output' ? (
              <div className="absolute inset-0 flex flex-col">
                <textarea
                  className="flex-1 bg-gray-900 p-4 text-xs font-mono text-green-400/90 resize-none focus:outline-none leading-relaxed"
                  placeholder="Output will appear here..."
                  value={outputCode}
                  readOnly
                  spellCheck={false}
                />
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col">
                <textarea
                  className="flex-1 bg-gray-900 p-4 text-xs font-mono text-yellow-400/90 resize-none focus:outline-none leading-relaxed"
                  placeholder="Paste JSON here to import, or view output..."
                  value={outputJson}
                  onChange={(e) => setOutputJson(e.target.value)}
                  spellCheck={false}
                />
              </div>
            )}
          </div>
        </aside>

      </div>
    </div>
  );
}

export default App;