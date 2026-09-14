create table if not exists book_previews (
  slug text primary key,
  chapter_one_title text not null default 'Chapter One',
  chapter_one_body text not null default '',
  chapter_two_title text not null default 'Chapter Two',
  chapter_two_body text not null default '',
  updated_at timestamptz not null default now()
);
