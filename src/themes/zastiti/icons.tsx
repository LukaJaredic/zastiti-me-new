/**
 * Phosphor icon registry for the zastiti theme: every Astryx semantic icon
 * name mapped to a Phosphor glyph. Kept in its own module because built
 * themes import the registry instead of inlining it.
 *
 * Weight: "regular" at md/lg, "bold" at sm/xsm so small glyphs stay legible.
 */

import React, {type ComponentType} from 'react';
import type {IconEntry, IconName, IconRequest} from '@astryxdesign/core/Icon';
import type {IconProps as PhosphorProps} from '@phosphor-icons/react';
import {
  ArrowDownIcon,
  ArrowSquareOutIcon,
  ArrowUpIcon,
  ArrowsDownUpIcon,
  CalendarBlankIcon,
  CaretDoubleLeftIcon,
  CaretDoubleRightIcon,
  CaretDownIcon,
  CaretLeftIcon,
  CaretRightIcon,
  CheckCircleIcon,
  CheckIcon,
  ChecksIcon,
  ClockIcon,
  ColumnsIcon,
  CopyIcon,
  DotsThreeIcon,
  EyeSlashIcon,
  FunnelIcon,
  InfoIcon,
  ListIcon,
  MagnifyingGlassIcon,
  MicrophoneIcon,
  StopIcon,
  UploadSimpleIcon,
  WarningIcon,
  WrenchIcon,
  XCircleIcon,
  XIcon,
} from '@phosphor-icons/react';

function glyph(Glyph: ComponentType<PhosphorProps>): IconEntry {
  return function PhosphorGlyph({size}: IconRequest) {
    return (
      <Glyph
        size="1em"
        weight={size === 'sm' || size === 'xsm' ? 'bold' : 'regular'}
        aria-hidden
      />
    );
  };
}

export const zastitiIcons: Record<IconName, IconEntry> = {
  close: glyph(XIcon),
  chevronDown: glyph(CaretDownIcon),
  chevronLeft: glyph(CaretLeftIcon),
  chevronRight: glyph(CaretRightIcon),
  chevronsLeft: glyph(CaretDoubleLeftIcon),
  chevronsRight: glyph(CaretDoubleRightIcon),
  check: glyph(CheckIcon),
  success: glyph(CheckCircleIcon),
  error: glyph(XCircleIcon),
  warning: glyph(WarningIcon),
  info: glyph(InfoIcon),
  calendar: glyph(CalendarBlankIcon),
  clock: glyph(ClockIcon),
  externalLink: glyph(ArrowSquareOutIcon),
  menu: glyph(ListIcon),
  moreHorizontal: glyph(DotsThreeIcon),
  search: glyph(MagnifyingGlassIcon),
  upload: glyph(UploadSimpleIcon),
  arrowUp: glyph(ArrowUpIcon),
  arrowDown: glyph(ArrowDownIcon),
  arrowsUpDown: glyph(ArrowsDownUpIcon),
  funnel: glyph(FunnelIcon),
  eyeSlash: glyph(EyeSlashIcon),
  viewColumns: glyph(ColumnsIcon),
  copy: glyph(CopyIcon),
  checkDouble: glyph(ChecksIcon),
  wrench: glyph(WrenchIcon),
  stop: glyph(StopIcon),
  microphone: glyph(MicrophoneIcon),
};
