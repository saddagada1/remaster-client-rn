import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chord, Key, Loop, Tuning } from "../../generated/graphql";
import { RootState } from "../store";

interface EditorState {
  id: number;
  creatorID: number;
  name: string;
  videoID: string;
  duration: number;
  artistID: number;
  artist: string;
  key: Key;
  tuning: Tuning;
  loops: Loop[];
  playingLoop: Loop | null;
  selectedLoop: Loop | null;
}

const initialState: EditorState = {
  id: 0,
  creatorID: 0,
  name: "",
  videoID: "",
  duration: 0,
  artistID: 0,
  artist: "",
  key: { id: 0, note: "", colour: "" },
  tuning: { id: 0, name: "", notes: [] },
  loops: [],
  playingLoop: null,
  selectedLoop: null,
};

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setEditor(state, action: PayloadAction<EditorState>) {
      (state.id = action.payload.id),
        (state.creatorID = action.payload.creatorID),
        (state.name = action.payload.name),
        (state.videoID = action.payload.videoID),
        (state.duration = action.payload.duration),
        (state.artistID = action.payload.artistID),
        (state.artist = action.payload.artist),
        (state.key = action.payload.key),
        (state.tuning = action.payload.tuning),
        (state.loops = action.payload.loops),
        (state.playingLoop = action.payload.playingLoop),
        (state.selectedLoop = action.payload.selectedLoop);
    },
    createLoop(state, action: PayloadAction<{ name: string; key: Key; type: string }>) {
      let lastLoopEnd;
      let newLoopEnd;
      if (state.loops.length === 0) {
        lastLoopEnd = 0;
      } else {
        lastLoopEnd = state.loops[state.loops.length - 1].end;
      }
      if (lastLoopEnd + 2 > state.duration) {
        newLoopEnd = state.duration;
      } else {
        newLoopEnd = lastLoopEnd + 2;
      }
      const newLoop: Loop = {
        id: state.loops.length + 1,
        name: action.payload.name,
        key: action.payload.key,
        type: action.payload.type,
        start: lastLoopEnd,
        end: newLoopEnd,
      };

      if (newLoop.id === 1) {
        state.playingLoop = newLoop;
      }
      state.loops = [...state.loops, newLoop];
    },
    updateLoop(state, action: PayloadAction<{ newLoop: Loop }>) {
      const newLoops = state.loops.map((loop) => {
        if (loop.id === action.payload.newLoop.id) {
          if (state.selectedLoop) {
            if (state.selectedLoop.id === loop.id) {
              state.selectedLoop = action.payload.newLoop;
            }
          }
          if (state.playingLoop) {
            if (state.playingLoop.id === loop.id) {
              state.playingLoop = action.payload.newLoop;
            }
          }
          return action.payload.newLoop;
        }

        return loop;
      });
      state.loops = newLoops;
    },
    deleteLoop(state, action: PayloadAction<{ deletedLoop: Loop }>) {
      // maybe dont need
      // if (state.selectedLoop) {
      //   state.selectedLoop = null
      // }
      // if (state.playingLoop) {
      //   state.playingLoop = null
      // }
      const filteredLoops = state.loops.filter((loop) => action.payload.deletedLoop.id !== loop.id);
      const newLoops = filteredLoops.map((loop, index) => {
        if (loop.id === action.payload.deletedLoop.id + 1) {
          const newLoop = {
            id: action.payload.deletedLoop.id,
            name: loop.name,
            key: loop.key,
            type: loop.type,
            start: action.payload.deletedLoop.id === 1 ? 0 : filteredLoops[index - 1].end,
            end: loop.end,
          };
          if (state.selectedLoop) {
            if (state.selectedLoop.id === action.payload.deletedLoop.id) {
              state.selectedLoop = newLoop;
            }
          }
          if (state.playingLoop) {
            if (state.playingLoop.id === action.payload.deletedLoop.id) {
              state.playingLoop = newLoop;
            }
          }
          return newLoop;
        } else if (loop.id > action.payload.deletedLoop.id + 1) {
          return {
            ...loop,
            id: loop.id - 1,
          };
        }

        return loop;
      });

      state.loops = newLoops;
    },
    setLoopChord(state, action: PayloadAction<{ targetLoop: Loop; chord: Chord | null }>) {
      const newLoops = state.loops.map((loop) => {
        if (loop.id === action.payload.targetLoop.id) {
          const newLoop = { ...loop, chord: action.payload.chord };
          if (state.selectedLoop) {
            if (state.selectedLoop.id === loop.id) {
              state.selectedLoop = newLoop;
            }
          }
          if (state.playingLoop) {
            if (state.playingLoop.id === loop.id) {
              state.playingLoop = newLoop;
            }
          }
          return newLoop;
        }

        return loop;
      });

      state.loops = newLoops;
    },
    setLoopTab(state, action: PayloadAction<{ targetLoop: Loop; tab: string | null }>) {
      const newLoops = state.loops.map((loop) => {
        if (loop.id === action.payload.targetLoop.id) {
          const newLoop = { ...loop, tab: action.payload.tab };
          if (state.selectedLoop) {
            if (state.selectedLoop.id === loop.id) {
              state.selectedLoop = newLoop;
            }
          }
          if (state.playingLoop) {
            if (state.playingLoop.id === loop.id) {
              state.playingLoop = newLoop;
            }
          }
          return newLoop;
        }

        return loop;
      });

      state.loops = newLoops;
    },
    resetEditor(state) {
      (state.id = initialState.id),
        (state.creatorID = initialState.creatorID),
        (state.name = initialState.name),
        (state.videoID = initialState.videoID),
        (state.duration = initialState.duration),
        (state.artistID = initialState.artistID),
        (state.artist = initialState.artist),
        (state.key = initialState.key),
        (state.tuning = initialState.tuning),
        (state.loops = initialState.loops),
        (state.playingLoop = initialState.playingLoop),
        (state.selectedLoop = initialState.selectedLoop);
    },
  },
});

export const { setEditor } = editorSlice.actions;
export const { createLoop } = editorSlice.actions;
export const { updateLoop } = editorSlice.actions;
export const { deleteLoop } = editorSlice.actions;
export const { setLoopChord } = editorSlice.actions;
export const { setLoopTab } = editorSlice.actions;
export const { resetEditor } = editorSlice.actions;

export const selectEditor = (state: RootState) => state.editor;

export default editorSlice.reducer;
