import React, { useEffect, useMemo, useRef, useState } from 'react';

export interface DropState {
  over: boolean;
}

export interface DropArea {
  onDragOver: React.DragEventHandler;
  onDragEnter: React.DragEventHandler;
  onDragLeave: React.DragEventHandler;
  onDrop: React.DragEventHandler;
  onPaste: React.ClipboardEventHandler;
}

export interface DropOptions {
  onFiles?: (files: File[], event?: unknown) => void;
  onText?: (text: string, event?: unknown) => void;
  onUri?: (url: string, event?: unknown) => void;
}

const empty = () => {
  console.log('Empty function');
};

const createProcess =
  (options: DropOptions, mounted: boolean) =>
  (dataTransfer: DataTransfer, event?: unknown) => {
    const uri = dataTransfer.getData('text/uri-list');

    if (uri) {
      (options.onUri || empty)(uri, event);
      return;
    }

    if (dataTransfer.files && dataTransfer.files.length) {
      (options.onFiles || empty)(Array.from(dataTransfer.files), event);
      return;
    }

    if (dataTransfer.items && dataTransfer.items.length) {
      dataTransfer.items[0].getAsString((text) => {
        if (mounted) {
          (options.onText || empty)(text, event);
        }
      });
    }
  };

const createBond = (
  process: (dataTransfer: DataTransfer, event?: unknown) => void,
  setOver: React.Dispatch<React.SetStateAction<boolean>>
): DropArea => ({
  onDragOver: (event) => event.preventDefault(),
  onDragEnter: (event) => {
    event.preventDefault();
    setOver(true);
  },
  onDragLeave: () => {
    setOver(false);
  },
  onDrop: (event) => {
    event.preventDefault();
    event.persist();
    setOver(false);
    process(event.dataTransfer, event);
  },
  onPaste: (event) => {
    event.persist();
    process(event.clipboardData, event);
  },
});

const useDrop = (options: DropOptions = {}): [DropArea, DropState] => {
  const { onFiles, onText, onUri } = options;
  const isMounted = useRef(false);
  const [over, setOver] = useState(false);
  const process = useMemo(
    () => createProcess(options, isMounted.current),
    [onFiles, onText, onUri]
  );
  const bond: DropArea = useMemo(
    () => createBond(process, setOver),
    [process, setOver]
  );

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return [bond, { over }];
};

export default useDrop;
