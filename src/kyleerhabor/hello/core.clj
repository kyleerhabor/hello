(ns kyleerhabor.hello.core
  (:require
    [clojure.java.io :as io]
    [kyleerhabor.hello.ui :as ui]
    [hiccup2.core :as h]
    [hickory.core :as hi]
    [hickory.render :refer [hickory-to-html]])
  (:import
    (java.nio.file Files Path StandardCopyOption)))

;;; A note on Hiccup: I was kind of surprised that nested elements (like :li>a) aren't supported.

(def doctype "<!DOCTYPE html>") ; hiccup.page/doctype includes an unnecessary linebreak.
(def default-hiccup-mode :html)

(defn html
  ([hiccup] (html hiccup default-hiccup-mode))
  ([hiccup mode]
   (str (h/html {:mode mode} hiccup))))

(defn hickory [html]
  (hi/as-hickory (hi/parse html)))

(defn hiccup->hickory
  ([hiccup] (hiccup->hickory hiccup default-hiccup-mode))
  ([hiccup mode] (hickory (html hiccup mode))))

(def scaffold (hiccup->hickory ui/scaffold))
(def home (hiccup->hickory ui/home))

(defn merge-contents [x y]
  (update x :content concat (:content y)))

(def descend [:content 0])

(def home-page
  (let [head (concat descend descend)
        body (concat descend [:content 1])]
    (-> scaffold
      (update-in head merge-contents (get-in home head))
      (update-in body merge-contents (get-in home body)))))

(defn -main []
  (let [path "out/index.html"
        public (io/file (io/resource "public"))
        out (Path/of (.toURI (io/file "out")))]
    (io/make-parents path)
    (doseq [;; The first item is the public folder itself.
            file (rest (file-seq public))]
      (let [path (Path/of (.toURI file))
            output (.resolve out (.getFileName path))]
        (Files/copy path output (into-array [StandardCopyOption/REPLACE_EXISTING]))))
    (spit path (str doctype (hickory-to-html home-page)))))
