import re

with open("0005_r.HTML", "r", encoding="utf-8") as f:
    text = f.read()

text = text.replace('"최종 3개월 이내 발급분"', "'최종 3개월 이내 발급분'")
text = text.replace('"서류자동제출서비스"', "'서류자동제출서비스'")

with open("0005_r.HTML", "w", encoding="utf-8") as f:
    f.write(text)
