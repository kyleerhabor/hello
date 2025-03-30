#!/bin/sh

set -e # Exit if any command fails

CWD="$(pwd)"
SRCDIR=submodules
BUILDDIR=preinstall
LIBJXL_SRCDIR="$SRCDIR/libjxl"
LIBVIPS_SRCDIR="$SRCDIR/libvips"
LIBJXL_BUILDDIR="$BUILDDIR/libjxl"
LIBVIPS_BUILDDIR="$BUILDDIR/libvips"

# Build

## libjxl

cmake \
  -D CMAKE_BUILD_TYPE=Release \
  -D "CMAKE_INSTALL_PREFIX=$CWD" \
  -D BUILD_TESTING=OFF \
  -D JPEGXL_ENABLE_BENCHMARK=FALSE \
  -D JPEGXL_ENABLE_DOXYGEN=FALSE \
  -D JPEGXL_ENABLE_EXAMPLES=FALSE \
  -D JPEGXL_ENABLE_JNI=FALSE \
  -D JPEGXL_ENABLE_MANPAGES=FALSE \
  -D JPEGXL_ENABLE_SKCMS=FALSE \
  -D JPEGXL_ENABLE_TOOLS=FALSE \
  -S "$CWD/$LIBJXL_SRCDIR" -B "$CWD/$LIBJXL_BUILDDIR"

cmake --build "$CWD/$LIBJXL_BUILDDIR" -- -j 4
cmake --install "$CWD/$LIBJXL_BUILDDIR"

## libvips

# I have no idea why we need to explicitly specify RPATH.

meson setup \
  --prefix "$CWD" \
  --buildtype release \
  --pkg-config-path "$CWD/lib/pkgconfig" \
  -D c_link_args="-Wl,-rpath,$CWD/lib" \
  -D cpp_link_args="-Wl,-rpath,$CWD/lib" \
  "$CWD/$LIBVIPS_BUILDDIR" "$CWD/$LIBVIPS_SRCDIR"

meson compile -C "$CWD/$LIBVIPS_BUILDDIR" -j 0
meson install -C "$CWD/$LIBVIPS_BUILDDIR"
