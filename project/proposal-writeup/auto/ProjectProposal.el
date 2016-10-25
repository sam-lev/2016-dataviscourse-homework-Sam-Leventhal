(TeX-add-style-hook
 "ProjectProposal"
 (lambda ()
   (TeX-add-to-alist 'LaTeX-provided-class-options
                     '(("article" "11pt" "a4paper")))
   (add-to-list 'LaTeX-verbatim-macros-with-braces-local "hyperref")
   (add-to-list 'LaTeX-verbatim-macros-with-braces-local "hyperimage")
   (add-to-list 'LaTeX-verbatim-macros-with-braces-local "hyperbaseurl")
   (add-to-list 'LaTeX-verbatim-macros-with-braces-local "nolinkurl")
   (add-to-list 'LaTeX-verbatim-macros-with-braces-local "path")
   (add-to-list 'LaTeX-verbatim-macros-with-braces-local "url")
   (add-to-list 'LaTeX-verbatim-macros-with-delims-local "path")
   (TeX-run-style-hooks
    "latex2e"
    "article"
    "art11"
    "algorithm"
    "algpseudocode"
    "empheq"
    "euscript"
    "amsmath"
    "amsthm"
    "amssymb"
    "epsfig"
    "xspace"
    "color"
    "url"
    "hyperref"
    "mathtools"
    "tikz")
   (TeX-add-symbols
    '("widefbox" 1)
    '("s" 1)
    "eps"
    "E")
   (LaTeX-add-labels
    "fig:prob1fig"))
 :latex)

