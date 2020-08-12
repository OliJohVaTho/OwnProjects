set nocompatible
filetype off
syntax on

" To be able to quickly swap between files in vim:
set hidden


" Better command-line completion
set wildmenu

" Show partial commands in the last line of the screen
set showcmd

" Highlight searches (use <C-L> to temporarily turn off highlighting; see the
" " mapping of <C-L> below)
set hlsearch

" Use case insensitive search, except when using capital letters
set ignorecase
set smartcase

" Allow backspacing over autoindent, line breaks and start of insert action
set backspace=indent,eol,start

" When opening a new line and no filetype-specific indenting is enabled, keep
" the same indent as the line you're currently on. Useful for READMEs, etc.
set autoindent

" Display the cursor position on the last line of the screen or in the status
" line of a window
set ruler

" Always display the status line, even if only one window is displayed
set laststatus=2


" Use visual bell instead of beeping when doing something wrong
set visualbell
"  
"  " And reset the terminal code for the visual bell. If visualbell is set,
"  and
"  " this line is also included, vim will neither flash nor beep. If
"  visualbell
"  " is unset, this does nothing.
set t_vb=


" Set the command window height to 2 lines, to avoid many cases of having to
" press <Enter> to continue
set cmdheight=2

" Display line numbers on the left
set number
set relativenumber

" Indentation settings for using 4 spaces instead of tabs.
" " Do not change 'tabstop' from its default value of 8 with this setup.
set shiftwidth=4
set softtabstop=4
set expandtab


set encoding=utf-8

"Allow rendering
set ttyfast

"Searching
nnoremap / /\v
vnoremap / /\v
set nohlsearch
set incsearch
set ignorecase
set smartcase
set showmatch
map <leader><space> :let @/=''<cr> " clear search


"Make the cursor to a block

" set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()


Plugin 'morhetz/gruvbox'
Plugin 'VundleVim/Vundle.vim'


call vundle#end() 
filetype plugin indent on

"To enable gruvbox, we have to use this command after we have enabled every plugin
autocmd vimenter * colorscheme gruvbox

"This command is to set background to dark, instead of using light version
set bg=dark

"This code snippet removes visual bug caused by redrawing.
if &term =~ '256color'
	    " Disable Background Color Erase (BCE) so that color schemes
	    "     " work properly when Vim is used inside tmux and GNU screen.
	set t_ut=
endif
