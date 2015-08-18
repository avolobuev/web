############################################################################################################

#author: Volobuev Alexander
#year: 2015

#task: you have math text expression and need to calculate result

############################################################################################################

#declarations block

#use strict;

############################################################################################################

#global variables definition

#debug info
#my $SRC_DATA = "-----START <Block Name1> ----- Var1:=(324,456 + 896,942.31 :92.54) * 1:2; Var2 := 894783456.21+20:-2----- END <Block Name>----------START <Block Name2> ----- Var1:=(324,456 + 896,942.31 :92.54) * 1:2; Var2 := 894783456.21+20:-2----- END <Block Name>-----";

my $SRC_DATA = Foo::GetDataChunk();#getting data

my $CNT_VARIABLES = 0;
my $CNT_BLOCKS = 0;

my $BLOCK_SPLIT_PATTERN = '[-\s]+END[<>a-zA-Z0-9\s]+';
my $BLOCK_NAME_PATTERN = '\<{1}[\w\d]+\>{1}';
my $VARIABLE_PATTERN = '[\w\d]+[(\:\=)]+[\)\(\+\:\*\-\d\.]+';


$SRC_DATA=~ s/\s+//g; # cut spaces
$SRC_DATA=~ s/\,+//g; # cut ,

my @BLOCKS = ();# array for storing blocks

############################################################################################################

#functions block

#procedure for working with expression
sub _calculate
{
    my $in = $_[0];#getting input params
    
    $in =~ s/\:\-/~/g;#if we have sequence like :- than replace it with ~
    $in =~ s/\*\-/|/g;#if we have sequence like *- than replace it with |
    
    #print $in;#debug info
    
    #check if there is ) at the end of statement, if no than add it
    if(substr($in,length($block_names[0]) - 2, 1) ne ")")
    {
    	$in = $in.")";#for starting calculation we need ) like a flag
    }
    
    #add space for every +,-,: and * in order to have an oportunity to split it into array
    $in =~ s/[\~\|\+\-\:\*\)\(]{1}/ $& /g;
    
    my @expr = split(/\s+/, $in);
    
    #print("@expr \n");#debug info
    
    #getting size of array
    my $len = @expr;
    
    #print("Count elements in expression:".$len."\n");#debug info
    
    #two stack algorithm of Deixtra
    my @operand = ();#digits
    my @operator = ();#+,-,:,*
    
    for(my $i = 0; $i < $len; $i++)
    {
      #print("step :".$i."\n"); #debug info
      #print("current element: ".$expr[$i]."\n");#debug info
      
      if($expr[$i] eq "(" || $expr[$i] eq " " || $expr[$i] eq "")
      {
      	  next;
      }
      elsif($expr[$i] eq "+" || $expr[$i] eq "-" || $expr[$i] eq "*" || $expr[$i] eq ":" || $expr[$i] eq "~" || $expr[$i] eq "|")
      {
      	#print("add element in operator:".$expr[$i]."\n");#debug info
        push(@operator, $expr[$i]);
        #print("elements in operator: @operator \n");#debug info
      }
      elsif($expr[$i] eq ")")#when ) then start calculations
      {
        my $action = pop(@operator);
        #print "action:".$action." ";#debug info
        my $element = pop(@operand);
        #print "over ".$element." ";#debug info
        for($action)#some kind of SWITCH construction
	{
		$_ eq "+" 
			&& (
				$element = $element + pop(@operand) #,
				#print "result of +: ".$element."\n"#debug info
			   );
		$_ eq "-" 
			&& (
				$element = pop(@operand) - $element #,
				#print "result of -: ".$element."\n"#debug info
			   );
		$_ eq "*"
			&& (
				$element = pop(@operand) * $element#,
				#print "result of *: ".$element."\n"#debug info
			   );
		$_ eq ":"
			&& (
				$element = pop(@operand) / $element #,
				#print "result of : ".$element."\n"#debug info
			   );
		$_ eq "~"
			&& (
				$element = -(pop(@operand) / $element) #,
				#print "result of ~ -".$element."\n"#debug info
			   );
		$_ eq "|"
			&& (
				$element = -(pop(@operand) * $element) #,
				#print "result of | -".$element."\n"#debug info
			   );
	}
	
	#print("element in operand:".$element."\n");#debug info
	push(@operand,$element);
	#print("elements in operand:@operand \n");#debug info
	#print "result after step $i - ".$element."\n";#debug info
	if(@operand > 1)#check if there is 2 or more elements in operand stack than again ) and new circle of calculation
	{
          $i--;
	}
      }
      else
      {
        push(@operand,$expr[$i]);#push digits
        #print("elements in operand: @operand \n");#debug info
      }
      #print("---------------------------- \n"); #debug info     
    }
    return pop(@operand);#return last element of operand stack as our result value
}

############################################################################################################

#main

#getting blocks splitting data by END pattern
@BLOCKS = split(/$BLOCK_SPLIT_PATTERN/, $SRC_DATA);
$CNT_BLOCKS = @BLOCKS - 1;

my @block_names = ();
my $block_name = "";

for(0..$CNT_BLOCKS-1)#block after block
{
  #getting block name
  @block_names = ($BLOCKS[$_]=~/$BLOCK_NAME_PATTERN/ig);
  $block_name = substr($block_names[0],1,length($block_names[0])-2);#get block name between < >
  
  #searching for variables in the block
  my @matches = ();
  @matches = ($BLOCKS[$_]=~/$VARIABLE_PATTERN/ig);
  for(my $i = 0; $i < @matches; $i++)#var after var calculate expressions
  {
  	my @vars = split(/\:\=/, $matches[$i]);#split name of var and expr 
	my $res = _calculate($vars[1]);#getting result of calculation or n/a for expr with error
	print $block_name.".".$vars[0]."=".$res."\n";#show result in format Block.Var=Value
  }
}

#end

############################################################################################################