(ns kyleerhabor.hello.ui
  (:require
   [kyleerhabor.hello.core :as-alias core]
   [kyleerhabor.hello.config :refer [config]]
   [kyleerhabor.hello.ui.icon :as icon]
   [garden.core :refer [css]]
   [garden.selectors :as s]
   [garden.stylesheet :refer [at-media]]
   [hiccup2.core :as h]))

(def scaffold
  [:html {:lang "en-US"}
   [:head
    [:meta {:charset "UTF-8"}]
    [:meta {:name "viewport"
            :content "width=device-width, initial-scale=1"}]]])

;;; CSS

(defn vari [s]
  (str "var(" s ")"))

(def default-css-flags {:pretty-print? (::core/debug? config)})

(def default-css-rules
  [[(s/root) {:--link-color (::link-color-light config)}]
   (at-media {:prefers-color-scheme "dark"}
     [(s/root) {:--link-color (::link-color-dark config)
                :--background-color (::background-color-dark config)}])
   [:* {:margin "0"
        :padding "0"
        :font "inherit"}]
   [:html {:background-color (vari "--background-color")
           :color-scheme "light dark"
           :line-height "1.5"}]
   [:body {:margin-block-start "0.5em"
           :margin-inline "auto"
           :max-width "min(100% - 1rem, 600px)"
           :box-sizing "border-box"
           :font-family ["\"Helvetica Neue\"" "\"Helvetica\"" "\"Arial\"" "sans-serif"]}]
   [:a {:color (vari "--link-color")}]
   (at-media {:hover "hover"}
     [:a {:text-decoration-line "inherit"}
      [:&:hover {:text-decoration-line "underline"}]])])

(def flex {:display "flex"})

(def no-list-style-type {:list-style-type "none"})

(def home
  [:html
   [:head
    [:title (::title config)]
    [:style
     (h/raw
       (css default-css-flags
         (conj default-css-rules
           [:body {:display "grid"
                   :gap "0.5em"}]
           ;; Close to, but not exactly bold (else, it looks weird with the h1).
           [:b {:font-weight "500"}]
           [:h1 {:font-size "1.6em"
                 :font-weight "bold"}]
           [:header {:grid-row "1"
                     :grid-column "2"
                     :justify-self "end"
                     :z-index "1"}]
           [:main {:grid-row "1 / 3"
                   :grid-column "1 / 3"}]
           ;; I'm giving the footer its own row so that a page super zoomed in doesn't cause the icons to be overlayed
           ;; on the text. I'm not doing this for the header to preserve space (and since it would require a page even
           ;; more zoomed in to occur).
           [:footer {:grid-row "3"
                     :grid-column "2"
                     :justify-self "end"
                     :align-self "end"}
            [:a {:color "inherit"}]]
           [:#navigation (merge flex no-list-style-type
                           {:font-size "1.075em"
                            :font-variant-caps "all-small-caps"
                            :font-weight "550"
                            :gap "0.35em"})]
           [:#links (merge flex no-list-style-type
                      {:gap "0.3125em"})])))]]
   [:body
    [:header
     [:nav
      ;; TODO: Add a link to the writings page (when it's implemented).
      [:ul {:id "navigation"}]]]
    [:main
     [:h1
      "Hello!"]
     [:p
      "I'm "
      [:b "Kyle Erhabor"]
      ", a software developer known online as "
      [:b "Klay"]
      "."]]
    [:footer
     [:address
      ;; On Safari, this has to be rem (as opposed to em) for the icons to scale with the zoom level.
      (let [height "1.5rem"]
        [:ul {:id "links"}
         [:li
          [:a {:href (str "mailto:" (::email config))
               :title "My email"}
           (update icon/mail 1 assoc :height height)]]
         [:li
          [:a {:href (::github config)
               :target "_blank"
               :title "My GitHub profile"}
           (update icon/github 1 assoc :height height)]]
         [:li
          [:a {:href (::anilist config)
               :target "_blank"
               :title "My AniList profile"}
           (update icon/anilist 1 assoc :height height)]]
         ;; TODO: Figure out a way to display the username on hover or click.
         #_[:li
            (update icon/discord 1 assoc :height height)]])]]]])

;; NOTE: I had an implementation for a writings (articles/blog/etc.) page, but decided to remove it, since just having a
;; home page is enough.
