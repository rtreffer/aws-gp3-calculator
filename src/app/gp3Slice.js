import { createSlice } from '@reduxjs/toolkit';

// Recommended reading
// https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-volume-types.html
// https://aws.amazon.com/ebs/pricing/
// https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-io-characteristics.html

var gp2max = function(state) {
  let gp3size  = state.size
  let gp3iops  = state.iops
  let gp3mibps = state.mibps

  // Number of disks
  // - 1 per 16TB
  // - 1 disk per 250MB/s of throughput
  // - 1 disk per 16000 IOPs
  var disks = Math.max(Math.ceil(gp3size / 16000), Math.ceil(gp3mibps / 250), gp3iops / 16000, 1)

  // Size might need to be larger to reach the peaks
  var size = gp3size
  if (size < (gp3mibps / 250 * 334)) {
    // we can't reach the desired throughput with that GB
    size = gp3mibps / 250 * 334
  }
  if (size < 5334 * gp3iops / 16000) {
    size = 5334 * gp3iops / 16000
  }

  var iops = Math.floor(16000 * size / 5334)
  // iops * maximum iop size (256KB) / 1024 (KB/MB)
  var mibps = Math.floor(iops / 4)

  return {
    disks: disks,
    size: size,
    iops: iops,
    mibps: mibps,
  }
}

var gp2min = function(state) {
  let gp3size  = state.size
  let gp3iops  = state.iops
  let gp3mibps = state.mibps

  // Number of disks
  // - 1 per 16TB
  // - 1 disk per 250MB/s of throughput
  // - 1 disk per 3000 IOPs
  var disks = Math.max(Math.ceil(gp3size / 16000), Math.ceil(gp3mibps / 250), Math.ceil(gp3iops / 3000), 1)

  // Size might need to be larger to reach the peaks
  var size = gp3size
  if (size < (gp3mibps / 250 * 334)) {
    // we can't reach the desired throughput with that GB
    size = gp3mibps / 250 * 334
  }
  if (size < gp3iops / 3000) {
    size = gp3iops / 3000
  }

  var iops = Math.floor(Math.min(16000 * disks, Math.max(16000 * size / 5334)))
  var iopsMax = Math.max(iops, 3000 * disks)
  var mibps = Math.floor(iops / 4)

  return {
    disks: disks,
    size: size,
    iops: iops,
    iopsMax: iopsMax,
    mibps: mibps,
  }
}

var gp2equivalent = function(state) {
  return {
    min: gp2min(state),
    max: gp2max(state),
  }
}

export const gp3Slice = createSlice({
  name: 'gp3',
  initialState: {
    sizeMax: 16000,
    size: 0,

    disks: 1,

    iops: 0,
    iopsMax: 0,
    iopsMin: 0,

    mibps: 0,
    mibpsMin: 0,
    mibpsMax: 0,

    gp2: {},
  },
  reducers: {
    setDiskSize: (state, action) => {
      state.size = action.payload
      if (state.size <= 0) {
        state.size = 1
      }
      if (state.size > state.disks * 16000) {
        state.disks = 1 + Math.floor(state.size / 16000)
      }
      if (state.size < state.disks) {
        state.disks = state.size
      }

      state.iopsMin = Math.min(state.disks * state.size * 500, state.disks * 3000)
      state.iopsMax = Math.min(state.disks * state.size * 500, state.disks * 16000)
      if (state.iops < state.iopsMin) {
        state.iops = state.iopsMin
      }
      if (state.iops > state.iopsMax) {
        state.iops = state.iopsMax
      }

      state.mibpsMin = Math.min(state.iops / 4, state.disks * 125)
      state.mibpsMax = Math.min(state.iops / 4, 1000 * state.disks)
      if (state.mibps < state.mibpsMin) {
        state.mibps = state.mibpsMin
      }
      if (state.mibps > state.mibpsMax) {
        state.mibps = state.mibpsMax
      }

      state.gp2 = gp2equivalent(state)
    },
    setDiskCount: (state, action) => {
      state.disks = action.payload
      if (state.disks <= 0) {
        state.disks = 1
      }
      if (state.size > state.disks * 16000) {
        state.size =  state.disks * 16000
      }
      if (state.size < state.disks) {
        state.size = state.disks
      }

      state.iopsMin = Math.min(state.disks * state.size * 500, state.disks * 3000)
      state.iopsMax = Math.min(state.disks * state.size * 500, state.disks * 16000)
      if (state.iops < state.iopsMin) {
        state.iops = state.iopsMin
      }
      if (state.iops > state.iopsMax) {
        state.iops = state.iopsMax
      }

      state.mibpsMin = Math.min(state.iops / 4, state.disks * 125)
      state.mibpsMax = Math.min(state.iops / 4, 1000 * state.disks)
      if (state.mibps < state.mibpsMin) {
        state.mibps = state.mibpsMin
      }
      if (state.mibps > state.mibpsMax) {
        state.mibps = state.mibpsMax
      }

      state.gp2 = gp2equivalent(state)
    },
    setIOPS: (state, action) => {
      state.iops = action.payload

      state.mibpsMin = Math.min(state.iops / 4, state.disks * 125)
      state.mibpsMax = Math.min(state.iops / 4, 1000 * state.disks)
      if (state.mibps < state.mibpsMin) {
        state.mibps = state.mibpsMin
      }
      if (state.mibps > state.mibpsMax) {
        state.mibps = state.mibpsMax
      }

      state.gp2 = gp2equivalent(state)
    },
    setMIBPS: (state, action) => {
      state.mibps = action.payload

      state.gp2 = gp2equivalent(state)
    }
  },
});

export const { setDiskSize, setDiskCount, setIOPS, setMIBPS } = gp3Slice.actions;

export default gp3Slice.reducer;
