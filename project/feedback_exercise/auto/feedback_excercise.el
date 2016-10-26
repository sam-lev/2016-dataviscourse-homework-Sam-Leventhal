(TeX-add-style-hook
 "feedback_excercise"
 (lambda ()
   (TeX-add-to-alist 'LaTeX-provided-class-options
                     '(("article" "11pt" "a4paper")))
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

