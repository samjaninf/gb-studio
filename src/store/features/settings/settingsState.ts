import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultProjectSettings } from "consts";
import { RootState } from "store/configureStore";
import { ActorDirection } from "store/features/entities/entitiesTypes";
import projectActions from "store/features/project/projectActions";

export type ShowConnectionsSetting = "all" | "selected" | true | false;
export type MusicDriverSetting = "huge" | "gbt";
export type CartType = "mbc5" | "mbc3";

export type SettingsState = {
  startSceneId: string;
  startX: number;
  startY: number;
  startMoveSpeed: number;
  startAnimSpeed: number | null;
  startDirection: ActorDirection;
  showCollisions: boolean;
  showConnections: ShowConnectionsSetting;
  showCollisionSlopeTiles: boolean;
  showCollisionExtraTiles: boolean;
  worldScrollX: number;
  worldScrollY: number;
  zoom: number;
  customColorsEnabled: boolean;
  sgbEnabled: boolean;
  customHead: string;
  defaultBackgroundPaletteIds: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
  ];
  defaultSpritePaletteIds: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
  ];
  defaultSpritePaletteId: string;
  defaultUIPaletteId: string;
  playerPaletteId: string;
  navigatorSplitSizes: number[];
  showNavigator: boolean;
  defaultFontId: string;
  defaultCharacterEncoding: string;
  defaultPlayerSprites: Record<string, string>;
  musicDriver: MusicDriverSetting;
  cartType: CartType;
  batterylessEnabled: boolean;
  favoriteEvents: string[];
  customColorsWhite: string;
  customColorsLight: string;
  customColorsDark: string;
  customColorsBlack: string;
  customControlsUp: string[];
  customControlsDown: string[];
  customControlsLeft: string[];
  customControlsRight: string[];
  customControlsA: string[];
  customControlsB: string[];
  customControlsStart: string[];
  customControlsSelect: string[];
};

export const initialState: SettingsState = defaultProjectSettings;

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    editSettings: (state, action: PayloadAction<Partial<SettingsState>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },

    editPlayerStartAt: (
      state,
      action: PayloadAction<{ sceneId: string; x: number; y: number }>
    ) => {
      state.startSceneId = action.payload.sceneId;
      state.startX = action.payload.x;
      state.startY = action.payload.y;
    },

    setSceneTypeDefaultPlayerSprite: (
      state,
      action: PayloadAction<{
        sceneType: string;
        spriteSheetId: string;
      }>
    ) => {
      state.defaultPlayerSprites[action.payload.sceneType] =
        action.payload.spriteSheetId;
    },

    setShowNavigator: (state, action: PayloadAction<boolean>) => {
      state.showNavigator = action.payload;
    },

    toggleFavoriteEvent: (state, action: PayloadAction<string>) => {
      if (state.favoriteEvents.includes(action.payload)) {
        state.favoriteEvents = state.favoriteEvents.filter(
          (item) => item !== action.payload
        );
      } else {
        state.favoriteEvents.push(action.payload);
      }
    },
  },
  extraReducers: (builder) =>
    builder.addCase(projectActions.loadProject.fulfilled, (state, action) => {
      return {
        ...state,
        ...action.payload.data.settings,
      };
    }),
});

export const getSettings = (state: RootState) => state.project.present.settings;

export const { actions, reducer } = settingsSlice;

export default reducer;
